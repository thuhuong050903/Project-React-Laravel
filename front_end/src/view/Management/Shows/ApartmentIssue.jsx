import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";




const ApartmentIssue = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [apartmentissue, setIssue] = useState([]);

  const fetchApartmentissue = () => {
    axios
      .get(`http://localhost:8000/api/get-Apartment_issue/${user.id}`)
      .then((response) => {
        const apartmentissue = response.data.map((apartment_issues) => ({
          ...apartment_issues,
          statusText:
            apartment_issues.resolved === "Chờ giải quyết"
              ? "Chờ giải quyết"
              : apartment_issues.resolved === "confirmed"
              ? "Confirmed"
              : "Canceled",
        }));
        setIssue(apartmentissue);
        console.log(response);
      })
      .catch((error) => {
        console.error("Failed to fetch apartment issue:", error);
      });
  };

  useEffect(() => {
    fetchApartmentissue();
  }, []);

  const handleConfirm = (issueId) => {
    axios
      .put(`http://localhost:8000/api/confirm-Apartment_issue/${issueId}`, {
        resolved: "Đã giải quyết",
      })
      .then(() => {
        const updatedApartmentissue = apartmentissue.map((apartmentissue) => {
          if (apartmentissue.issue_id === issueId) {
            return {
              ...apartmentissue,
              resolved: "Đã giải quyết",
              statusText: "Đã giải quyết",
            };
          }
          return apartmentissue;
        });
        setIssue(updatedApartmentissue);
        console.log("Appointment status updated successfully");
      })
      .catch((error) => {
        console.error("Failed to confirm appointment:", error);
      });
  };


  const columns = [
    {
      name: "Number Room",
      cell: (row) => row.apartments.number_room,
      sortable: true,
    },

    {
      name: "Number address",
      cell: (row) => row.apartments.number_address,
      sortable: true,
    },

    {
      name: "Street",
      cell: (row) => row.apartments.street,
      sortable: true,
    },

    {
      name: "Ward",
      cell: (row) => row.apartments.ward,
      sortable: true,
    },

    {
      name: "District",
      cell: (row) => row.apartments.district,
      sortable: true,
    },

    {
      name: "User Name",
      cell: (row) => row.users.fullname,
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
    },

    {
      name: "Report day",
      selector: "report_date",
      sortable: true,
    },

    {
      name: "Resolved",
      cell: (row) =>
        row.resolved === "Chờ giải quyết" ? (
          <button
          type="button"
            className="btn btn-sm btn-success"
            onClick={() => handleConfirm(row.issue_id)}
          >
            Chờ giải quyết
          </button>
        ) : (
          row.resolved
        ),sortable: true,
    },
  ];

  return (
    <div style={{ marginTop: "10rem" }}>
      {apartmentissue && apartmentissue.length > 0 ? (
        <DataTable
          style={{ marginLeft: "28px", with: "96%" }}
          title="ConfirmApartmentissue"
          columns={columns}
          data={apartmentissue}
          paginationPerPage={10}
          defaultSortField="apartment_id"
          pagination
        />
      ) : (
        <h1>No ApartmentIssue available</h1>
      )}
    </div>
  );
};

export default ApartmentIssue;
