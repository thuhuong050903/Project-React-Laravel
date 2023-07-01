import axios from 'axios';
import React, { Component } from 'react';
import "../../../assets/style/Management/Contracts.css"



class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
    };
  }

  async componentDidMount() {
    await this.fetchContracts();
  }

  fetchContracts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-contracts");
      const currentDate = new Date();
      const contracts = response.data.map(contract => {
        const endDate = new Date(contract.end_date);
        const status = currentDate > endDate ? "HẾT HỢP ĐỒNG" : "ĐANG HỢP ĐỒNG";
        return { ...contract, status };
      });

      this.setState({ contracts });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
     
      <div className="list_apartment contracts">
        {this.state.contracts.map(contract => (
          <div className="card contracts_card" key={contract.contract_id}>
            <div className="card-body">
              <h5 className="card-title contracts_card-title">CONTRACTS ID: {contract.contract_id}</h5>
              <br></br>
              <div className="contract-info">
                <span className="contract-label">User Name:</span>
                <span className="contract-value">{contract.users.fullname}</span>
              </div>
              <div className="contract-info">
                <span className="contract-label">Type of Apartment:</span>
                <span className="contract-value">{contract.apartments.type_room}</span>
              </div>

              <div className="contract-info">
                <span className="contract-label">Street:</span>
                <span className="contract-value">{contract.apartments.addresses.street}</span>
              </div>

              <div className="contract-info">
                <span className="contract-label">Ward:</span>
                <span className="contract-value">{contract.apartments.addresses.ward}</span>
              </div>

              <div className="contract-info">
                <span className="contract-label">District:</span>
                <span className="contract-value">{contract.apartments.addresses.district}</span>
              </div>
              <div className="contract-info">
                <span className="contract-label">Start Date:</span>
                <span className="contract-value">{contract.start_date}</span>
              </div>
              <div className="contract-info">
                <span className="contract-label">End Date:</span>
                <span className="contract-value">{contract.end_date}</span>
              </div>
              <div className="contract-info">
                <span className="contract-label">Status:</span>
                <span className="contract-value status">{contract.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Contract;
