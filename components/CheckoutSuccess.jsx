import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <div className='container'>
    <h2>Checkout Successful</h2>
    <h4>Thank you for your Purchase</h4>
    <br/>
    <Link to="/order-history" className='btn btn-primary'>View Order Status</Link>
    </div>
  )
}

export default CheckoutSuccess
