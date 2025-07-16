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
import Product from '../img/p.jpg';
import Customer from '../img/c.jpg';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../App.css';

const productData = [
  {
    id: 1,
    img: `${Product}`,
    name: 'Lenovo IdeaPad 3',
    date:'19 Nov 2022',
    customerImg: `${Customer}`,
    customerName: 'Carl Evans',
    status: 'Received',
    total:1000,
    paid:1000,
    due:'0.00',
    paymentStatus:'Paid'
  },
  {
    id: 2,
    img: `${Product}`,
    name: 'Lenovo IdeaPad 3',
    date:'19 Nov 2022',
    customerImg: `${Customer}`,
    customerName: 'Minerva Rameriz',
    status: 'Pending',
    total:1500,
    paid:'0.00',
    due:1500,
    paymentStatus:'Unpaid'
  },
  {
    id: 3,
    img: `${Product}`,
    name: 'Lenovo IdeaPad 3',
    date:'19 Nov 2022',
    customerImg: `${Customer}`,
    customerName: 'Robert Lamon',
    status: 'Received',
    total:2000,
    paid:1000,
    due:'1000',
    paymentStatus:'Overdue'
  },
  {
    id: 4,
    img: `${Product}`,
    name: 'Lenovo IdeaPad 3',
    date:'19 Nov 2022',
    customerImg: `${Customer}`,
    customerName: 'Carl Evans',
    status: 'Received',
    total:1000,
    paid:1000,
    due:'0.00',
    paymentStatus:'Paid'
  },
  {
    id: 5,
    img: `${Product}`,
    name: 'Lenovo IdeaPad 3',
    date:'19 Nov 2022',
    customerImg: `${Customer}`,
    customerName: 'Carl Evans',
    status: 'Received',
    total:1000,
    paid:1000,
    due:'0.00',
    paymentStatus:'Paid'
  },
  {
    id: 6,
    img: `${Product}`,
    name: 'Lenovo IdeaPad 3',
    date:'19 Nov 2022',
    customerImg: `${Customer}`,
    customerName: 'Carl Evans',
    status: 'Received',
    total:1000,
    paid:1000,
    due:'0.00',
    paymentStatus:'Paid'
  },
  {
    id: 7,
    img: `${Product}`,
    name: 'Lenovo IdeaPad 3',
    date:'19 Nov 2022',
    customerImg: `${Customer}`,
    customerName: 'Carl Evans',
    status: 'Received',
    total:1000,
    paid:1000,
    due:'0.00',
    paymentStatus:'Paid'
  }
]

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
    "Serial no",
    "Product",
    "Date",
    "Customer",
    "Status",
    "Total",
    "Paid",
    "Due",
    "Payment Status",
  ];

  const tableRows = productData.map((e) =>[
    e.id,
    e.name,
    e.date,
    e.customerName,
    e.status,
    e.total,
    e.paid,
    e.due,
    e.paymentStatus,
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
    "Serial no",
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
    ...productData.map((e) => [
    e.id,
    e.name,
    e.date,
    e.customerName,
    e.status,
    e.total,
    e.paid,
    e.due,
    e.paymentStatus,
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

function SalesReturn() {
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
            <div className='srheadbtn' style={{display:'flex', gap:'10px'}}>
                <button onClick={handlePdf} style={{backgroundColor:'white', padding:'4px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><FaFilePdf style={{color:'red'}} /></button>
                <button onClick={handleCSV} style={{backgroundColor:'white', padding:'4px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><BsFiletypeXml style={{color:'green'}} /></button>
                <button onClick={() => location.reload()} style={{backgroundColor:'white', padding:'4px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><LuRefreshCcw style={{color:'#8d8f90ff'}} /></button>
                <div style={{backgroundColor:'white', padding:'4px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><IoIosArrowUp style={{color:'#8d8f90ff'}} /></div>
                <div style={{backgroundColor:'#FAA046', color:'white', padding:'4px 5px', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px', display:'flex', gap:'5px'}}><Link to="/AddSalesReturn" style={{textDecoration:'none', color:'white'}}><CiCirclePlus className='sricon' style={{fontSize:'25px'}} /> Add Sales Return</Link></div>
            </div>
        </div>

        {/* table body */}
        <div className='mt-3' style={{border:'1px solid #a9abacff', borderRadius:'10px', overflow:'hidden'}}>

        {/* search box */}
        <div style={{backgroundColor:'white', padding:'10px'}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div className='srsearchrow' style={{border:'1px solid #E6EAEC', alignItems:'center', padding:'5px', borderRadius:'5px'}}>
              <CiSearch style={{color:'#8d8f90ff'}} />
              <input type="text" placeholder='search' style={{border:'none', color:'#8d8f90ff', outline:'none'}} />
            </div>
            <div style={{display:'flex', gap:'5px'}}>
              <select style={{border:'1px solid #E6EAEC', color:'#8d8f90ff', borderRadius:'5px'}}>
                <option>Customer</option>
              </select>
              <select style={{border:'1px solid #E6EAEC', color:'#8d8f90ff', borderRadius:'5px'}}>
                <option>Status</option>
              </select>
              <select style={{border:'1px solid #E6EAEC', color:'#8d8f90ff', borderRadius:'5px'}}>
                <option>Payment Status</option>
              </select>
              <select style={{border:'1px solid #E6EAEC', color:'#8d8f90ff', borderRadius:'5px'}}>
                <option>Sort By: Last 7 Days</option>
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
            {productData.map((e) =>
            <>
              <tr key={e.id} style={{backgroundColor:'white', borderTop:'1px solid #a9abacff', color:'#8d8f90ff'}}>
                <td style={{padding:'10px'}}><input type="checkbox"/></td>
                <td><img className='srimg' src={e.img} style={{width:'30px', borderRadius:'5px'}} /> <span style={{color:'#272727ff'}}>{e.name}</span></td>
                <td>{e.date}</td>
                <td><img className='srimg' src={e.customerImg} style={{width:'30px', borderRadius:'5px'}} /> <span style={{color:'#272727ff'}}>{e.customerName}</span></td>
                <td><span className={`${status(e.status)}`} style={{color:'white', padding:'2px 5px', borderRadius:'5px'}}>{e.status}</span></td>
                <td>${e.total}</td>
                <td>${e.paid}</td>
                <td>${e.due}</td>
                <td><span className={`${paymentStatus(e.paymentStatus)}`} style={{padding:'2px 5px', borderRadius:'5px'}}> • {e.paymentStatus}</span></td>
                <td>
                  <div style={{display:'flex', gap:'5px'}}>
                  <div className='srtableicon' style={{backgroundColor:'white', padding:'5px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><FaRegEdit style={{color:'#272727ff'}} /></div>
                  <div className='srtableicon' style={{backgroundColor:'white', padding:'5px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><RiDeleteBin5Line style={{color:'#272727ff'}} /></div>
                  </div>
                </td>
              </tr>
            </>
            )}
            </tbody>
          </table>
        </div>

        {/* rows filter */}
        <div style={{display:'flex', justifyContent:'space-between', padding:'15px', backgroundColor:'white'}}>
            <div style={{display:'flex', gap:'10px', alignItems:'center', color:'#8d8f90ff'}}>
              <span className='srrowtitle'>Row Per Page</span>
              <select className='srselect' style={{borderRadius:'5px', color:'#8d8f90ff'}}>
                <option>10</option>
                <option>20</option>
              </select>
              <span className='srrowtitle'>Entries</span>
            </div>
            <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
              <div><IoIosArrowBack style={{color:'#8d8f90ff'}} /></div>
              <div className='srpage' style={{backgroundColor:'orange', padding:'5px 12px', borderRadius:'50%', color:'white'}}>1</div>
              <div><IoIosArrowForward style={{color:'#8d8f90ff'}} /></div>
            </div>
        </div>

        </div>

    </div>
    </>
  )
}

export default SalesReturn