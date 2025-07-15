import React from 'react'
import { Link } from 'react-router-dom'
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeXml } from "react-icons/bs";
import { LuRefreshCcw } from "react-icons/lu";
import { IoIosArrowUp } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";

function SalesReturn() {
  return (
    <>
    <div style={{padding:'10px'}}>

        {/* header */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
                <span style={{fontSize:'20px', fontWeight:'500'}}>Sales Return</span>
                <br/>
                <span style={{color:'#898b8cff'}}>Manage your returns</span>
            </div>
            <div style={{display:'flex', gap:'10px'}}>
                <div style={{backgroundColor:'white', padding:'4px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><FaFilePdf style={{color:'red'}} /></div>
                <div style={{backgroundColor:'white', padding:'4px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><BsFiletypeXml style={{color:'green'}} /></div>
                <div style={{backgroundColor:'white', padding:'4px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><LuRefreshCcw /></div>
                <div style={{backgroundColor:'white', padding:'4px 7px', display:'flex', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px'}}><IoIosArrowUp /></div>
                <div style={{backgroundColor:'#FAA046', color:'white', padding:'4px 5px', alignItems:'center', border:'1px solid #E6EAEC',borderRadius:'5px', display:'flex', gap:'5px', alignItems:'center'}}><CiCirclePlus style={{fontSize:'25px'}} /> <Link to="/AddSalesReturn" style={{textDecoration:'none', color:'white'}}>Add Sales Return</Link></div>
            </div>
        </div>

    </div>
    </>
  )
}

export default SalesReturn