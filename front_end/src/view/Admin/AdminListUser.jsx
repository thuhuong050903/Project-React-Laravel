import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";

class AdminListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      updatingUserId: null,
      error: null,
    };
  }

  async componentDidMount() {
    await this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-user");
      const users = response.data;
      this.setState({ users });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async updateUserStatus(id) {
    try {
      this.setState({ updatingUserId: id });

      const user = this.state.users.find((user) => user.id === id);
      const currentStatus = user.status;
      const newStatus = currentStatus === "Block" ? "Active" : "Block";

      await axios.put(`http://localhost:8000/api/update-user/${id}`, {
        status: newStatus,
      });

      const updatedUsers = this.state.users.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      );
      this.setState({ users: updatedUsers });

      alert("Cập nhật trạng thái thành công");
    } catch (error) {
      console.log(error);
      alert("Đã xảy ra lỗi khi cập nhật trạng thái");
    } finally {
      this.setState({ updatingUserId: null });
    }
  }

  render() {
    const { users, updatingUserId, error } = this.state;
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
        name: "Status",
        cell: (row) => (
          <div>{row.status}</div>
        ),
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <div>
            <button
              className="btn btn-sm btn-primary"
              style={{ width: "80px" }}
              onClick={() => this.updateUserStatus(row.id)}
              type="button"
              disabled={updatingUserId === row.id}
            >
              {row.status === "Active" ? "Block" : "Active"}
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
      <div className="list_apartment">
        <DataTable
          title="User List"
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

export default AdminListUser;
