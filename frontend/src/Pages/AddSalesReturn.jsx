import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IoMdCloseCircle } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { LuScanBarcode } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function AddSalesReturn() {

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [addCustomerName, setAddCustomer] = useState('');
  const [customers, setCustomers] = useState([]);

  const handleAddCustomer = async(e) => {
    e.preventDefault();
    setMessage();
    try{
      const res = await fetch(`${backend_url}/api/customer/add`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ addCustomerName })
      });

      const data = await res.json();

      if(res.ok){
        setMessage(data.alert);
      } else {
        setMessage("Error : " + data.error);
      }

    } catch(error) {
      setMessage("Error : " + error.message);
    }
  }

  const fetchCustomers = () => {
    fetch(`${backend_url}/api/customer/list`)
    .then(res => res.json())
    .then(data => { setCustomers(data);})
    .catch((error) => { setError(error.message); })
  };
  useEffect(() => {fetchCustomers();});

  return (
    <>
      <div className='m-3' style={{backgroundColor:'white', borderRadius:'10px'}}>
        
        {/* header */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #E6EAEC'}}>
          
          <div style={{fontWeight:'500', padding:'10px', fontSize:'20px'}}>
            Add Sales Return
          </div>

          <Link to="/" style={{padding:'10px'}}>
            <IoMdCloseCircle style={{color:'red',fontSize:'25px'}} />
          </Link>

        </div>

        {/* container */}
        <div style={{padding:'10px', borderBottom:'1px solid #E6EAEC' }}>

        {/* 1st row */}
        <div className='row'>

          <div className='col-sm-4 mt-2'>
            <div>Customer Name <span style={{color:'red'}}>*</span></div>
            <div style={{width:'100%', display:'flex', gap:'5px', alignItems:'center', justifyContent:'space-between'}}>
              <select style={{border:'1px solid #E6EAEC', borderRadius:'5px', padding:'7px', width:'100%'}}>
              <option>--select customer--</option>
              {customers.map((e) => 
              <option key={e._id} value={e.customerName}>{e.customerName}</option>
              )}
              </select>
              <div onClick={handleShow} style={{cursor:'pointer'}}>
                <CiCirclePlus style={{border:'1px solid #1B2B4F', backgroundColor:'#1B2B4F', color:'white', fontSize:'36px', borderRadius:'5px'}} />
              </div>
            </div>
          </div>

      {/* show - popup */}
      <Modal show={show} onHide={handleClose} centered>

        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        
        <Modal.Body style={{}}>
          <div style={{padding:'0px', margin:'0px'}}>
          <form onSubmit={handleAddCustomer} onReset={() => { setAddCustomer(''); setMessage(''); }}>
          <div style={{borderBottom:'1px solid #E6EAEC', padding:'5px'}}>
            <span>Customer <span style={{color:'red'}}>*</span></span>
            <br/>
            <input className='form-control' type='text' placeholder='Enter Customer Name' value={addCustomerName} onChange={e => setAddCustomer(e.target.value)} required />
            <br/>
          </div>

          <div style={{padding:'15px 0px 0px', display:'flex', justifyContent:'end', gap:'10px'}}>
            <button type="reset" className='btn' style={{backgroundColor:'#1B2B4F', color:'white'}}>Clear</button>
            <button type="submit" className='btn' style={{backgroundColor:'#FAA046', color:'white'}}>Add  Customer</button>
          </div>
          </form>
          {message && <div style={{color:'red', textAlign:'center', marginTop:'10px'}}>{message}</div>}
          </div>
        </Modal.Body>

      </Modal>

          <div className='col-sm-4 mt-2'>
            <div>Date <span style={{color:'red'}}>*</span></div>
            <input type='date' className='form-control' style={{width:'100%'}} />
          </div>

          <div className='col-sm-4 mt-2'>
            <div>Reference <span style={{color:'red'}}>*</span></div>
            <input type='text' placeholder='Reference' className='form-control' style={{width:'100%'}} />
          </div>
        
          {error && <div style={{color:'red', textAlign:'center', marginTop:'10px'}}>{error}</div>}
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

          <div className='col-sm-6'>
          </div>

          <div className='col-sm-6' style={{borderRadius:'8px', border:'1px solid gray', padding:'0px', overflow:'hidden'}}>
            <table style={{border:'1px solid gray', width:'100%'}}>
              <thead>
                <tr style={{borderBottom:'1px solid gray'}}>
                  <td style={{borderRight:'1px solid gray', padding:'8px', backgroundColor:'#FAFBFF'}}>Order Tax</td>
                  <td style={{textAlign:'right', padding:'8px'}}>$0.00</td>
                </tr>
              </thead>
              <tbody>
                <tr style={{borderBottom:'1px solid gray'}}>
                  <td style={{borderRight:'1px solid gray', padding:'8px', backgroundColor:'#FAFBFF'}}>Discount</td>
                  <td style={{textAlign:'right', padding:'8px'}}>$0.00</td>
                </tr>
                <tr style={{borderBottom:'1px solid gray'}}>
                  <td style={{borderRight:'1px solid gray', padding:'8px', backgroundColor:'#FAFBFF'}}>Shipping</td>
                  <td style={{textAlign:'right', padding:'8px'}}>$0.00</td>
                </tr>
                <tr style={{borderBottom:'1px solid gray'}}>
                  <td style={{borderRight:'1px solid gray', padding:'8px', backgroundColor:'#FAFBFF'}}>Grand Total</td>
                  <td style={{textAlign:'right', padding:'8px'}}>$0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5th row */}
        <div className='row mt-2 mb-5'>

          <div className='col-sm-3 mt-2'>
            <div>Order Tax <span style={{color:'red'}}>*</span></div>
            <input type='number' placeholder='0' className='form-control' style={{width:'100%'}} />
          </div>

          <div className='col-sm-3 mt-2'>
            <div>Discount <span style={{color:'red'}}>*</span></div>
            <input type='number' placeholder='0' className='form-control' style={{width:'100%'}} />
          </div>

          <div className='col-sm-3 mt-2'>
            <div>Shipping <span style={{color:'red'}}>*</span></div>
            <input type='number' placeholder='0' className='form-control' style={{width:'100%'}} />
          </div>

          <div className='col-sm-3 mt-2'>
            <div>Status <span style={{color:'red'}}>*</span></div>
            <div style={{width:'100%', display:'flex', gap:'5px', alignItems:'center', justifyContent:'space-between'}}>
              <select style={{border:'1px solid #E6EAEC', borderRadius:'5px', padding:'7px', width:'100%'}}>
              <option>select</option>
              <option>0</option>
              </select>
            </div>
          </div>

        </div>

        </div>

        {/* buttons */}
        <div style={{padding:'10px', display:'flex', justifyContent:'end', gap:'10px'}}>
          <Link to="/" className='btn' style={{backgroundColor:'#1B2B4F', color:'white'}}>Cancel</Link>
          <button className='btn' style={{backgroundColor:'#FAA046', color:'white'}}>Submit</button>
        </div>

      </div>
    </>
  )
}

export default AddSalesReturn
