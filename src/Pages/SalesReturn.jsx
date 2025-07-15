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

const productData = [
  {
    id: 1,
    img: '',
    name: 'Lenovo IdeaPad 3',
    date:'19 Nov 2022',
    customerImg: '',
    customerName: 'Carl Evans',
    status: 'Received',
    total:1000,
    paid:1000,
    due:0.00,
    paymentStatus:'Paid'
  },
]

function SalesReturn() {
  return (
    <>
    <div style={{padding:'10px'}}>

        {/* header */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
                <span style={{fontSize:'20px', fontWeight:'500'}}>Sales Return</span>
                <br/>
                <span style={{color:'#a9abacff'}}>Manage your returns</span>
            </div>
            <div style={{display:'flex', gap:'10px'}}>
                <div style={{backgroundColor:'white', padding:'4px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><FaFilePdf style={{color:'red'}} /></div>
                <div style={{backgroundColor:'white', padding:'4px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><BsFiletypeXml style={{color:'green'}} /></div>
                <div style={{backgroundColor:'white', padding:'4px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><LuRefreshCcw style={{color:'#a9abacff'}} /></div>
                <div style={{backgroundColor:'white', padding:'4px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><IoIosArrowUp style={{color:'#a9abacff'}} /></div>
                <div style={{backgroundColor:'#FAA046', color:'white', padding:'4px 5px', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px', display:'flex', gap:'5px', alignItems:'center'}}><CiCirclePlus style={{fontSize:'25px'}} /> <Link to="/AddSalesReturn" style={{textDecoration:'none', color:'white'}}>Add Sales Return</Link></div>
            </div>
        </div>

        {/* table body */}
        <div className='mt-3' style={{border:'1px solid #a9abacff', borderRadius:'10px', overflow:'hidden'}}>

        {/* search box */}
        <div style={{backgroundColor:'white', padding:'10px'}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{border:'1px solid #E6EAEC', alignItems:'center', padding:'5px', borderRadius:'5px'}}>
              <CiSearch style={{color:'#a9abacff'}} />
              <input type="text" placeholder='search' style={{border:'none', color:'#a9abacff', outline:'none'}} />
            </div>
            <div style={{display:'flex', gap:'5px'}}>
              <select style={{border:'1px solid #E6EAEC', color:'#a9abacff'}}>
                <option>Customer</option>
              </select>
              <select style={{border:'1px solid #E6EAEC', color:'#a9abacff'}}>
                <option>Status</option>
              </select>
              <select style={{border:'1px solid #E6EAEC', color:'#a9abacff'}}>
                <option>Payment Status</option>
              </select>
              <select style={{border:'1px solid #E6EAEC', color:'#a9abacff'}}>
                <option>Sort By: Last 7 Days</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* product listing table */}
        <div style={{backgroundColor:'white', borderTop:'1px solid #a9abacff'}}>
          <table style={{width:'100%', backgroundColor:'#E6EAEC'}}>
            <thead>
              <tr>
                <th style={{padding:'10px'}}><input type="checkbox"/></th>
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
              <tr style={{backgroundColor:'white', borderTop:'1px solid #a9abacff'}}>
                <td style={{padding:'10px'}}><input type="checkbox"/></td>
                <td>i</td>
                <td>h</td>
                <td>g</td>
                <td>f</td>
                <td>e</td>
                <td>d</td>
                <td>c</td>
                <td>b</td>
                <td><div style={{display:'flex', gap:'5px'}}>
                  <div style={{backgroundColor:'white', padding:'5px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><FaRegEdit /></div>
                  <div style={{backgroundColor:'white', padding:'5px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><RiDeleteBin5Line /></div>
                  </div></td>
              </tr>
            </tbody>
          </table>
        </div>

        </div>

    </div>
    </>
  )
}

export default SalesReturn