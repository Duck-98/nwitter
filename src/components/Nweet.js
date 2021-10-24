import React from "react";

const Nweet = ({nweetObj, isOwner}) =>{
    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        if(ok){
            //delete tweet
        }

    }
    return (
    <div>
        <h4>{nweetObj.nweet}</h4>
        {isOwner && (
            <>
                <button>Delete tweet</button>
                <button>Edit Nweet</button>            
            </>
        )}
    </div>

    );
};

export default Nweet;