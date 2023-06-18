import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";
class List_user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      deletingUserId: null, 
      error: null,
    };
    this.deleteUsers = this.deleteUsers.bind(this);
  }
  async componentDidMount() {
    await this.fetchUsers();
  }
  async fetchUsers() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-user");
      this.setState({ users: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  async deleteUsers(id) {
    const confirmDelete = window.confirm(`Bạn muốn xóa người dùng có ID là ${id}`);
    if (!confirmDelete) {
      return;
    }
    if (this.state.deletingUserId) {
      return;
    }
    try {
      this.setState({ deletingUserId: id });
      await axios.delete(`http://localhost:8000/api/delete-user/${id}`);
      alert("Xóa người dùng thành công");
      await this.fetchUsers();
    } catch (error) {
      console.log(error);
      alert("Đã xảy ra lỗi khi xóa người dùng");
    } finally {
      this.setState({ deletingUserId: null });
    }
  }
  render() {
    const { users, deletingUserId, error, id  } = this.state;
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
              onClick={() => this.deleteUsers(row.id)}
              type="button"
            >
              Delete
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
          title="User List"
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
export default List_user;
