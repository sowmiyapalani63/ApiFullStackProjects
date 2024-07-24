import React from 'react';
import { AiOutlineAreaChart } from "react-icons/ai";
import{ CgAlarm } from "react-icons/cg";
export const ProductCard = ({ coverImage, department, title, description, totalSales, originalPrice, salePrice, duration, lessons, progress, rating, SaleOn }) => {
    return (
        <div className="card card-custom border-0">
            <div className="card-header p-0">
            <div className="specilation-card-img">
                <img src={require (`../../Assests/images/${coverImage}`)} className="card-img-top position-realtive" alt={coverImage} />
                <span className="badge bg-danger position-absolute specilation-card-badge">{SaleOn}</span>
                <div className="custom-icons d-flex gap-3 text-center">
                    <i className="bi bi-heart p-2 bg-white text-dark rounded-circle"></i>
                    <i className="bi bi-cart p-2 bg-white text-dark rounded-circle"></i>
                    <i className="bi bi-eye-fill p-2 bg-white text-dark rounded-circle"></i>
                </div>
            </div>
            </div>
            
            <div className="card-body d-flex flex-column gap-1 pt-2">
                <span className="d-flex justify-content-between align-items-center">
                    <span className="primary-color font-14 fw-bold responsive-font">{department}</span>
                    <span className="p-1 bg-dark rounded-pill text-white responsive-font d-flex flex-row">
                        <i className="bi bi-star-fill text-warning"></i> <span>{rating}</span>
                    </span>
                </span>
                <h5 className="card-title fw-bold font-16 responsive-font-subheading">{title}</h5>
                <p className="card-text font-14 fw-normal lh-20 responsive-font">{description}</p>
                <div className="d-flex gap-2">
                    <span><i className="bi bi-download"></i></span>
                    <span className="second-text-color fw-bold font-14 responsive-font">{totalSales} Sales</span>
                </div>
                <div className="d-flex gap-2">
                    <span className="second-text-color fw-bold font-16 responsive-font-subheading">${originalPrice}</span>
                    <span className="sale-text-green fw-bold font-16 responsive-font-subheading">${salePrice}</span>
                </div>
                <div className="icon-group d-flex gap-3 icon-gap">
                    <span className="d-flex gap-2 align-items-center">
                        <CgAlarm  className="text-primary icon-gap "/>
                        <span className="text-muted font-12 fw-normal font-10">{duration}</span>
                    </span>
                    <span className="d-flex gap-2 align-items-center icon-gap ">
                        <i className="bi bi-journal-text text-danger"></i>
                        <span className="text-muted font-12 fw-normal font-10">{lessons} Lessons</span>
                    </span>
                    <span className="d-flex gap-2 align-items-center icon-gap font-10">
                    <AiOutlineAreaChart className=" sale-text-green" />
                        <span className="text-muted font-12 fw-normal">{progress}</span>
                    </span>
                </div>
                <div className="learn-more-div">
                    <button className="btn primary-border primary-color rounded-pill p-2">
                        <span className="responsive-font font-14 fw-bold">Learn More </span>
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

