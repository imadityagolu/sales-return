import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdCloseCircle } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { LuScanBarcode } from "react-icons/lu";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='m-3' style={{backgroundColor:'white'}}>
        
        {/* header */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #E6EAEC'}}>
          
          <div style={{fontWeight:'500', padding:'10px', fontSize:'20px'}}>
            Add Sales Return
          </div>

          <div style={{padding:'10px'}}>
            <IoMdCloseCircle style={{color:'red'}} />
          </div>

        </div>

        {/* container */}
        <div style={{padding:'10px', borderBottom:'1px solid #E6EAEC' }}>

        {/* 1st row */}
        <div className='row'>

          <div className='col-sm-4 mt-2'>
            <div>Customer Name <span style={{color:'red'}}>*</span></div>
            <div style={{width:'100%', display:'flex', gap:'5px', alignItems:'center', justifyContent:'space-between'}}>
              <select style={{border:'1px solid #E6EAEC', borderRadius:'5px', padding:'7px', width:'100%'}}>
              <option>select</option>
              <option>Customer Name</option>
              </select>
              <CiCirclePlus style={{border:'1px solid #1B2B4F', backgroundColor:'#1B2B4F', color:'white', fontSize:'36px', borderRadius:'5px'}} />
            </div>
          </div>

          <div className='col-sm-4 mt-2'>
            <div>Date <span style={{color:'red'}}>*</span></div>
            <input type='date' className='form-control' style={{width:'100%'}} />
          </div>

          <div className='col-sm-4 mt-2'>
            <div>Reference <span style={{color:'red'}}>*</span></div>
            <input type='text' placeholder='Reference' className='form-control' style={{width:'100%'}} />
          </div>

        </div>

        {/* 2nd row */}
        <div className='row mt-3'>
          <div className='col'>
            <div>Product <span style={{color:'red'}}>*</span></div>
            <div style={{display:'flex', justifyContent:'space-between', width:'100%', border:'1px solid #E6EAEC', borderRadius:'5px', alignItems:'center', padding:'7px'}}>
              <input type='text' placeholder='Please Type Product code and select' className='' style={{width:'100%', border:'none', outline:'none'}} />
              <LuScanBarcode />
            </div>
          </div>
        </div>

        {/* 3rd row */}
        <div className='row mt-3 product-table' style={{fontSize:'15px'}}>
          <div className='col' style={{}}>
            <table style={{borderCollapse:'collapse', backgroundColor:'#E6EAEC',width:'100%'}}>
            <thead>
              <tr>
                <th style={{padding:'10px'}}>Product Name</th>
                <th>Net Until Price($)</th>
                <th>Stock</th>
                <th>QTY</th>
                <th>Discount($)</th>
                <th>Tax %</th>
                <th>Subtotal ($)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{borderBottom:'1px solid #E6EAEC', backgroundColor:'white'}}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
            </table>
          </div>
        </div>

        {/* 4th row */}
        <div className='row mt-3 px-3'>
          <div className='col'></div>
          <div className='col' style={{borderRadius:'10px', border:'1px solid gray'}}>
            {/* <div>Order Tax</div>
            <div>Discount</div>
            <div>Shipping</div>
            <div>Grand Total</div> */}
            <table>
              <thead>
                <tr>
                  <td>Order Tax</td>
                  <td>$0.00</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Discount</td>
                  <tr>$0.00</tr>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        </div>

        {/* buttons */}
        <div style={{padding:'10px', display:'flex', justifyContent:'end', gap:'10px'}}>
          <button className='btn btn-primary'>Cancel</button>
          <button className='btn btn-warning'>Submit</button>
        </div>

      </div>
    </>
  )
}

export default App
