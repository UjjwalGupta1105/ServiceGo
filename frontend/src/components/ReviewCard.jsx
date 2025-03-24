import img from '../assets/logo2.jpg'
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const ReviewCard=({review})=>{
    return(
        
        <>
           <div className="review-card">
                              <div> <img src={img} alt="User" /></div>
                                
                                 <div className="review-data">
                                 <p className='reviewer-name'>{review.name}</p>
                                <Stack spacing={1}><Rating name="half-rating-read" defaultValue={review?.rating} precision={0.5} readOnly /></Stack>
                                <p className="review-comment">{review.comment}</p>
                                 </div>
                             </div>
        </>
    )
}

export default ReviewCard