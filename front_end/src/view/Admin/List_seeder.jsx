import "../../assets/style/List_apartment.css";
import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";
class List_seeder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [], 
      error: null,
     
    };
  }
  async componentDidMount() {
    await this.fetchUsers();
  }
async fetchUsers() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-user");
      const users = response.data.filter(user => user.role === "Chủ sở hữu");
      this.setState({ users });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  render() {
    const { users,  error, id  } = this.state;
    const columns = [
      {
        name: "ID",
        selector: "id",
        sortable: true,
      },
      {
        name: "Username",
        selector: "username",
        sortable: true,
      },
      {
        name: "Fullname",
        selector: "fullname",
        sortable: true,
        wrap: true,
      },
      {
        name: "Email",
        selector: "email",
        sortable: true,
      },
      {
        name: "Phone",
        selector: "phone",
        sortable: true,
      },
      {
        name: "Address",
        selector: "address",
        sortable: true,
      },
      {
        name: "Password",
        selector: "password",
        sortable: true,
      },
      {
        name: "Birthday",
        selector: "birthday",
        sortable: true,
      },
      {
        name: "Role",
        selector: "role",
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <div>
            <button
              className="btn btn-sm btn-danger"
              style={{ width: "80px" }}
              onClick={() => this.waitchUsers(row.id)}
              type="button"
            >
              Xem
            </button>
          </div>
        ),
        compact: true,
      },
    ];
    if (error) {
      return <div>{error}</div>; 
    }
    return (
      <div className="list_apartment" >
        <DataTable
          title="List seeder"
          columns={columns}
          data={this.state.users}
          paginationPerPage={5}
          defaultSortField="id"
          pagination
        />
      </div>
    );
  }
}
export default List_seeder;
