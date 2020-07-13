import React from "react";
import { 
  UncontrolledPopover,
  PopoverBody
} from 'reactstrap' 

const ProductInfo = ({ product }) => {
  return (
    <>
      <div className="title-and-share d-flex">
          <h1 className="josefin-sans-b p-0 m-0 flex-grow-1">{product.title}</h1>
          <button id="share" style={{color: 'rgba(0,0,0,0.4)'}} className="bg-transparent border-0 outline-none ml-0 ml-sm-0 ml-lg-4 ml-xl-4">
              <span style={{color:'#000'}}><i className="fa fa-share-alt"></i></span>
          </button> 
      </div>
      <p className="has-text-left josefin-sans-sb is-size-5 text-caitalize mt-3" >
        {product.variants[0].title}
      </p>
      <p className=" has-text-right has-text-weight-bold is-size-3 py-3 josefin-sans-b">
        ${product.variants[0].price}
      </p>
    </>
  );
};

export default ProductInfo;