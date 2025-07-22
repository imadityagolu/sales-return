import React from 'react'
import { Link } from 'react-router-dom'
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeXml } from "react-icons/bs";
import { LuRefreshCcw } from "react-icons/lu";
import { IoIosArrowUp } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { RiImportLine } from "react-icons/ri";
import Product from '../img/p.jpg';
import Customer from '../img/c.jpg';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../App.css';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

function SalesReturn() {

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState(''); // <-- Add search state

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('Last 7 Days');

  const fetchCustomers = () => {
    fetch(`${backend_url}/api/customer/list`)
    .then(res => res.json())
    .then(data => { setCustomers(data);})
    .catch((error) => { setError(error.message); })
  };
  useEffect(() => {fetchCustomers();},[]);

const fetchProducts = () => {
  fetch(`${backend_url}/api/sales/listsalesreturn`)
    .then(res => res.json())
    .then(data => { 
      const monthAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const formattedData = data.map(item => {
      const date = new Date(item.date);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${monthAbbr[date.getMonth()]} ${date.getFullYear()}`;
      return {
        ...item,
        formattedDate
        };
      });
      setProducts(formattedData);
      })
    .catch((error) => { setError(error.message); });
};
useEffect(() => {fetchProducts();}, []);

const status = (status) => {
  switch (status) {
    case "Received" : return "received";
    case "Pending" : return "pending";
    default : return "";
  }
}

const paymentStatus = (paymentStatus) => {
  switch (paymentStatus) {
    case "Paid" : return "paid";
    case "Unpaid" : return "unpaid";
    case "Overdue" : return "overdue";
    default : return "";
  }
}

const handlePdf = () => {
  const doc = new jsPDF();
  doc.text("Sales Return",14,15);
  const tableColumns = [
    "Product",
    "Date",
    "Customer",
    "Status",
    "Total",
    "Paid",
    "Due",
    "Payment Status",
  ];

  const tableRows = products.map((e) =>[
    e.productName,
    e.formattedDate,
    e.customerName,
    e.returnstatus,
    e.grandTotal,
    e.paid,
    e.due,
    e.paymentstatus,
  ]);

  autoTable(doc, {
    head: [tableColumns],
    body: tableRows,
    startY: 20,
    styles:{
      fontSize: 8,
    },
    headStyles: {
      fillColor: [155, 155, 155],
        textColor: "white",
    },
    theme:"striped",
  });

  doc.save("SalesReturn.pdf");
}

const handleCSV = () => {
  const tableHeader = [
    "Product",
    "Date",
    "Customer",
    "Status",
    "Total",
    "Paid",
    "Due",
    "Payment Status",
  ];
  const csvRows = [
    tableHeader.join(","),
    ...products.map((e) => [
    e.productName,
    e.formattedDate,
    e.customerName,
    e.returnstatus,
    e.grandTotal,
    e.paid,
    e.due,
    e.paymentstatus,
    ].join(",")),
  ];
  const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "sales-return.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sales return?")) return;
    try {
      const res = await fetch(`${backend_url}/api/sales/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(products.filter(item => item._id !== id));
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
};

// Filter products by search query (product name or customer name) and select filters
const filteredProducts = products.filter(item => {
  const query = search.toLowerCase();
  const matchesSearch =
    item.productName?.toLowerCase().includes(query) ||
    item.customerName?.toLowerCase().includes(query);
  const matchesCustomer = customerName === '' || item.customerName === customerName;
  const matchesStatus = statusFilter === '' || item.returnstatus === statusFilter;
  const matchesPaymentStatus = paymentStatusFilter === '' || item.paymentstatus === paymentStatusFilter;
  let matchesSort = true;
  if (sortBy === 'Last 7 Days') {
    const now = new Date();
    const itemDate = new Date(item.date);
    const diffTime = now - itemDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    matchesSort = diffDays <= 7;
  }
  return matchesSearch && matchesCustomer && matchesStatus && matchesPaymentStatus && matchesSort;
});

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
useEffect(() => {
  setCurrentPage(1);
}, [products, search, customerName, statusFilter, paymentStatusFilter, sortBy]);

  const fileInputRef = React.useRef();

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      alert('Please select a .csv file');
      return;
    }
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const requiredFields = [
          'customerName', 'date', 'reference', 'productName', 'grandTotal', 'orderTax', 'orderDiscount', 'shipping', 'returnstatus'
        ];
        const valid = results.data.every(row => requiredFields.every(f => f in row && row[f] !== ''));
        if (!valid) {
          alert('CSV structure does not match the required schema.');
          return;
        }
        // Optionally: convert types (grandTotal, orderTax, orderDiscount, shipping to Number, date to Date)
        const formattedData = results.data.map(row => ({
          ...row,
          grandTotal: Number(row.grandTotal),
          orderTax: Number(row.orderTax),
          orderDiscount: Number(row.orderDiscount),
          shipping: Number(row.shipping),
          date: new Date(row.date)
        }));
        // Send to backend
        try {
          const res = await fetch(`${backend_url}/api/sales/import-csv`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: formattedData })
          });
          const data = await res.json();
          if (res.ok) {
            alert('Import successful!');
            fetchProducts();
          } else {
            alert(data.error || 'Import failed.');
          }
        } catch (err) {
          alert('Error: ' + err.message);
        }
      }
    });
  };

  return (
    <>
    <div className='srbody' style={{padding:'15px 20px'}}>

        {/* header */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
                <span className='srheader' style={{fontSize:'20px', fontWeight:'500'}}>Sales Return</span>
                <br/>
                <span className='srtitle' style={{color:'#a9abacff'}}>Manage your returns</span>
            </div>
            <div className='srheadbtn' style={{display:'flex', gap:'10px', alignItems:'center'}}>
                
                <button type="button" onClick={handleImportClick} style={{backgroundColor:'white', padding:'9px 8px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><RiImportLine style={{color:'blue'}} /></button>
                <input type="file" accept=".csv" ref={fileInputRef} style={{display:'none'}} onChange={handleFileChange} />
                
                <button onClick={handlePdf} style={{backgroundColor:'white', padding:'9px 8px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><FaFilePdf style={{color:'red'}} /></button>
                <button onClick={handleCSV} style={{backgroundColor:'white', padding:'9px 8px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><BsFiletypeXml style={{color:'green'}} /></button>
                <button onClick={() => location.reload()} style={{backgroundColor:'white', padding:'9px 8px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><LuRefreshCcw style={{color:'#8d8f90ff'}} /></button>
                <div style={{backgroundColor:'white', padding:'9px 8px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><IoIosArrowUp style={{color:'#8d8f90ff'}} /></div>
                <div style={{backgroundColor:'#FAA046', color:'white', padding:'4px 5px', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px', display:'flex', gap:'5px'}}><Link to="/AddSalesReturn" style={{textDecoration:'none', color:'white'}}><CiCirclePlus className='sricon' style={{fontSize:'25px'}} /> Add Sales Return</Link></div>
            </div>
        </div>

        {/* table body */}
        <div className='mt-2' style={{border:'1px solid #a9abacff', borderRadius:'10px', overflow:'hidden'}}>

        {/* search box */}
        <div style={{backgroundColor:'white', padding:'10px'}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div className='srsearchrow' style={{border:'1px solid #E6EAEC', alignItems:'center', padding:'5px', borderRadius:'5px'}}>
              <CiSearch style={{color:'#8d8f90ff'}} />
              <input type="text" placeholder='search by customer or product...' style={{border:'none', color:'#8d8f90ff', outline:'none', width:'250px'}} 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div style={{display:'flex', gap:'5px'}}>
              <select style={{border:'1px solid #E6EAEC', color:'#8d8f90ff', borderRadius:'5px'}} value={customerName} onChange={e => setCustomerName(e.target.value)}>
                <option value=''>--Customer--</option>
                {customers.map((e) => 
                <option key={e._id} value={e.customerName}>{e.customerName}</option>
                )}
              </select>
              <select style={{border:'1px solid #E6EAEC', color:'#8d8f90ff', borderRadius:'5px'}} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value=''>--Status--</option>
                <option value='Received'>Received</option>
                <option value='Pending'>Pending</option>
              </select>
              <select style={{border:'1px solid #E6EAEC', color:'#8d8f90ff', borderRadius:'5px'}} value={paymentStatusFilter} onChange={e => setPaymentStatusFilter(e.target.value)}>
                <option value=''>--Payment Status--</option>
                <option value='Paid'>Paid</option>
                <option value='Unpaid'>Unpaid</option>
                <option value='Overdue'>Overdue</option>
              </select>
              <select style={{border:'1px solid #E6EAEC', color:'#8d8f90ff', borderRadius:'5px'}} value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value='All'>Sort By: All</option>
                <option value='Last 7 Days'>Sort By: Last 7 Days</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* product listing table */}
        <div className='sproduct-table' style={{backgroundColor:'white', borderTop:'1px solid #a9abacff', fontSize:'15px'}}>
          <table style={{width:'100%', backgroundColor:'#E6EAEC'}}>
            <thead>
              <tr>
                <th className='srtablehead' style={{padding:'10px'}}><input type="checkbox"/></th>
                <th>Product</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Payment Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {currentProducts.map((e) =>
            <>
              <tr key={e.id} style={{backgroundColor:'white', borderTop:'1px solid #a9abacff', color:'#8d8f90ff'}}>
                <td style={{padding:'10px'}}><input type="checkbox"/></td>
                <td><img className='srimg' src={Product} style={{width:'30px', borderRadius:'5px'}} /> <span style={{color:'#272727ff'}}>{e.productName}</span></td>
                <td>{e.formattedDate}</td>
                <td><img className='srimg' src={Customer} style={{width:'30px', borderRadius:'5px'}} /> <span style={{color:'#272727ff'}}>{e.customerName}</span></td>
                <td><span className={`${status(e.returnstatus)}`} style={{color:'white', padding:'2px 5px', borderRadius:'5px'}}>{e.returnstatus}</span></td>
                <td>${e.grandTotal}</td>
                <td>${e.paid}</td>
                <td>${e.due}</td>
                <td><span className={`${paymentStatus(e.paymentstatus)}`} style={{padding:'2px 5px', borderRadius:'5px'}}> • {e.paymentstatus}</span></td>
                <td>
                  <div style={{display:'flex', gap:'5px'}}>
                  <button className='srtableicon' style={{backgroundColor:'white', padding:'5px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><FaRegEdit style={{color:'#272727ff'}} /></button>
                  <button onClick={() => handleDelete(e._id)} className='srtableicon' style={{backgroundColor:'white', padding:'5px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><RiDeleteBin5Line style={{color:'#272727ff'}} /></button>
                  </div>
                </td>
              </tr>
            </>
            )}
            </tbody>
          </table>
          {error && <p>{error}</p>}
        </div>

        {/* rows filter */}
        <div style={{display:'flex', justifyContent:'space-between', padding:'15px', backgroundColor:'white'}}>
            <div style={{display:'flex', gap:'10px', alignItems:'center', color:'#8d8f90ff'}}>
              <span className='srrowtitle'>Row Per Page</span>
              <select className='srselect' style={{borderRadius:'5px', color:'#8d8f90ff'}}>
                <option>10</option>
              </select>
              <span className='srrowtitle'>Entries</span>
            </div>
            <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
              <button style={{border:'none'}} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}><IoIosArrowBack style={{color:'#8d8f90ff'}} /></button>
              <div className='srpage' style={{backgroundColor:'orange', padding:'5px 12px', borderRadius:'50%', color:'white'}}>{currentPage}</div>
              <button style={{border:'none'}} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}><IoIosArrowForward style={{color:'#8d8f90ff'}} /></button>
            </div>
        </div>

        </div>

    </div>
    </>
  )
}

export default SalesReturn