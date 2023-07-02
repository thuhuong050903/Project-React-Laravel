import React, { useState, useEffect } from "react";


const AdminCount = ({ title, count, iconClass, colorClass }) => { 

    return (
        <div className="col-xl-3 col-md-6 mb-4">
      <div className={`card border-left-${colorClass} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-uppercase mb-1">{title}</div>
              <div className="row no-gutters align-items-center">
                <div className="col-auto">
                  <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800"></div>
                </div>
                <div className="col">
                  <div className="card-body">{count}</div>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <i className={`fas ${iconClass} fa-2x text-gray-300`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  
    );
};

export default AdminCount;