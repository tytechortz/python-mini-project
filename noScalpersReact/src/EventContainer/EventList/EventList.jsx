import React from 'react';

const EventList = (props) => {

    const events =  props.events.map((event, i)=> {

     

            return (
                        <div key = {i} >
                               <h5>{event.displayName} </h5>
                        </div>

                    )
        
      
       
    })
        
    return(
        <div>
            <h1>{events}</h1>
        </div>
    )


   


}

export default EventList;