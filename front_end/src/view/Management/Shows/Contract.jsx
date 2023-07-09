import  { useEffect, useState } from 'react';
import axios from 'axios';
import "../../../assets/style/Management/Contracts.css"

const Contract = () => {
  const [contracts, setContracts] = useState([]);
  let count = 0;
  const user = JSON.parse(sessionStorage.getItem('user'));
  const fetchContracts = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/get-contracts/${user.id}`);
      const currentDate = new Date();
      const updatedContracts = response.data.map(contract => {
        const endDate = new Date(contract.end_date);
        const status = currentDate > endDate ? "HẾT HỢP ĐỒNG" : "ĐANG HỢP ĐỒNG";
        return { ...contract, status };
      });

      setContracts(updatedContracts);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <div className="contracts" style={{marginTop:"10rem"}}>
    {contracts ? (
      contracts.map(contract => (
        <div className="card contracts_card" key={contract.contract_id} style={{marginTop:"10rem"}}>
          <div className="card-body">
            <h5 className="card-title contracts_card-title">Contracts</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="contract-info">
                  <span className="contract-label">Tên người thuê:</span>
                  <span className="contract-value">{contract.user.fullname}</span>
                </div>
                <div className="contract-info">
                  <span className="contract-label">Loại phòng:</span>
                  <span className="contract-value">{contract.apartment.type_room}</span>
                </div>
                <div className="contract-info">
                  <span className="contract-label">Địa chỉ:</span>
                  <span className="contract-value">{contract.apartment.number_address}-{contract.apartment.street} - {contract.apartment.ward} - {contract.apartment.district}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="contract-info">
                  <span className="contract-label">Ngày bắt đầu:</span>
                  <span className="contract-value">{contract.start_date}</span>
                </div>
                <div className="contract-info">
                  <span className="contract-label">Ngày hết hạn:</span>
                  <span className="contract-value">{contract.end_date}</span>
                </div>
                <div className="contract-info">
                  <span className="contract-label">Trạng thái:</span>
                  <br></br>
                  <span className={`contract-value status ${contract.status.toLowerCase()}`}>{contract.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <h1>Bạn chưa có hợp đồng nào</h1>
    )}
  </div>
  ); 
};

export default Contract;