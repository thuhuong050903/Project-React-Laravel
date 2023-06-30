import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import SeederApartmentsPage from "./SeederApartmentsPage";
import "../../assets/style/List_apartment.css";
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
      const response = await axios.get("http://localhost:8000/api/get-user");
      const users = response.data.filter((user) => user.role === "Chủ sở hữu");
      this.setState({ users });
    } catch (error) {
      console.error("Error fetching users:", error);
      this.setState({ error: "Error fetching users" });
    }
  }

  render() {
    const { users, error } = this.state;

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
        cell: ({ id }) => (
          <Link to={`/SeederApartmentsPage/${id}`}>
            <button className="btn btn-sm btn-warning" style={{ width: "80px" }} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
            </button>
          </Link>
        ),
        compact: true,
      },
    ];

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="list_apartment">
        <DataTable
          title="List seeder"
          columns={columns}
          data={users}
          paginationPerPage={5}
          defaultSortField="id"
          pagination
        />
      </div>
    );
  }
}

export default List_seeder;
