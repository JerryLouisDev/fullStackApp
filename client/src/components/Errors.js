import React from 'react'

// Exporting errors for users to validate
export default function Errors({errors}) {
  return (
    <div className="validation--errors">
       <h3>Validation Errors</h3>
       <ul>
         {errors.map((error, i) => (
           <li key={i}>{error}</li>
         ))}
       </ul>
     </div>
  )
}