import { useState, useEffect } from "react";
import { Edit3, Plus, Battery, Trash } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import styles from "../css/vehicle.module.css";

// Connector badge
const ConnectorBadge = ({ connector }) => {
  let colorClass = "";
  switch (connector) {
    case "CCS2":
      colorClass = styles.ccs2;
      break;
    case "CHAdeMO":
      colorClass = styles.chademo;
      break;
    case "Type2":
      colorClass = styles.type2;
      break;
    case "GB/T":
      colorClass = styles.gbt;
      break;
    default:
      colorClass = "";
  }
  return <span className={`${styles.connectorBadge} ${colorClass}`}>{connector}</span>;
};

const VehicleCard = ({ vehicle, onEdit, onDelete }) => {
  return (
    <div className={`card shadow-sm w-100 ${styles.cardContainer}`}>
      <div className="card-body d-flex flex-wrap flex-column justify-content-between">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start ">
          <h5 className="card-title mb-0">
            {vehicle.make}
          </h5>
          <div className="d-flex gap-2">
            <button
              onClick={() => onEdit(vehicle)}
              className={`btn btn-outline-success btn-sm ${styles.editButton}`}
              title="Edit Vehicle"
            >
              <Edit3 size={12} strokeWidth={3} />
              <span>Edit</span>
            </button>
            <button className={`btn btn-outline-danger btn-sm ${styles.deleteButton}`} onClick={() => onDelete(vehicle._id)}>
              <Trash size={14} />
            </button>
          </div>
        </div>
        <h5 className="card-title mb-0">
          <span className="text-primary">{vehicle.model}</span>
        </h5>

        {/* Details */}
        <div className="mt-3">
          <div className="d-flex justify-content-between align-items-center mb-2 gap-4">
            <div className="d-flex align-items-center">
              <Battery size={20} strokeWidth={3} className="me-1 text-primary" />
              <small>Battery: {vehicle.batteryCapacityKwh} kWh</small>
            </div>
            <ConnectorBadge connector={vehicle.preferredConnector} />
          </div>
        </div>
      </div>
    </div>
  );
};


const Vehicle = () => {
  const { fetchProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [error, setError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    batteryCapacityKwh: "",
    preferredConnector: "CCS2",
  });

  const openAddModal = () => {
    setEditingVehicle(null);
    setFormData({ make: "", model: "", batteryCapacityKwh: "", preferredConnector: "" });
    setShowModal(true);
  };

  const openEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      make: vehicle.make,
      model: vehicle.model,
      batteryCapacityKwh: vehicle.batteryCapacityKwh,
      preferredConnector: vehicle.preferredConnector,
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/vehicles`, {
        credentials: "include",
      });
      const data = await res.json();
      setVehicles(data || []);
    } catch (err) {
      console.error("Fetch Vehicles Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const method = editingVehicle ? "PUT" : "POST";
    const url = editingVehicle
      ? `${import.meta.env.VITE_SERVER_URL}/api/vehicles/${editingVehicle._id}`
      : `${import.meta.env.VITE_SERVER_URL}/api/vehicles`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save vehicle");

      await fetchVehicles();
      await fetchProfile();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };


  const confirmDelete = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!vehicleToDelete) return;

    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/api/vehicles/${vehicleToDelete._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      await fetchVehicles();
      await fetchProfile();
    } catch (err) {
      alert("Delete failed");
    } finally {
      setShowDeleteModal(false);
      setVehicleToDelete(null);
    }
  };

  return (
    <div className="container mx-auto mt-5 px-4">
      <h2 className="mb-4">Vehicle Inventory</h2>
      <hr className="mb-4" />

      <button
        className="btn btn-outline-success px-2 py-1 mb-4 d-flex align-items-center gap-2"
        onClick={openAddModal}
      >
        <Plus size={15} strokeWidth={4} />
        <span>Add New Vehicle</span>
      </button>

      {loading ? (
        <p>Loading vehicles...</p>
      ) : vehicles.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No vehicles added yet. Click "Add New Vehicle" to get started!
        </div>
      ) : (
        <div className="row g-3">
          {vehicles.map((v) => (
            <div
              key={v._id}
              className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-wrap"
            >
              <VehicleCard vehicle={v} onEdit={openEditModal} onDelete={() => confirmDelete(v)} />
            </div>
          ))}
        </div>
      )}


      {/* Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <form className="modal-content" onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">{editingVehicle ? "Edit Vehicle" : "Add Vehicle"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Make</label>
                  <input
                    type="text"
                    className="form-control px-4 py-2 rounded-3"
                    name="make"
                    placeholder="e.g., Tesla"
                    value={formData.make}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Model</label>
                  <input
                    type="text"
                    className="form-control px-4 py-2 rounded-3"
                    name="model"
                    placeholder="e.g., Model 3"
                    value={formData.model}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Battery Capacity (kWh)</label>
                  <input
                    type="number"
                    className="form-control px-4 py-2 rounded-3"
                    name="batteryCapacityKwh"
                    placeholder="e.g., 75"
                    value={formData.batteryCapacityKwh}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Connector Type</label>
                  <select
                    className={`form-select px-4 py-2 rounded-3 ${styles.dropdown}`}
                    name="preferredConnector"
                    value={formData.preferredConnector}
                    onChange={handleFormChange}
                  >
                    <option value="" disabled hidden>
                      Select connector type
                    </option>
                    <option value="CCS2">CCS2</option>
                    <option value="CHAdeMO">CHAdeMO</option>
                    <option value="Type2">Type2</option>
                    <option value="GB/T">GB/T</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer gap-2">
                <button type="button" className={`btn btn-danger px-2 py-1 ${styles.cancelBtn}`} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className={`btn btn-success px-2 py-1 ${styles.saveBtn}`}>{editingVehicle ? "Save Changes" : "Add Vehicle"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}

      {showDeleteModal && (
        <>
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title text-white">Confirm Deletion</h5>
                  <button
                    className="btn-close btn-close-white"
                    onClick={() => setShowDeleteModal(false)}
                  ></button>
                </div>

                <div className="modal-body text-center">
                  <p className="mb-0">
                    Are you sure you want to delete: <br />
                    <strong>{vehicleToDelete?.make} {vehicleToDelete?.model}</strong>?
                  </p>
                  <p className="text-secondary small mt-2">
                    This action cannot be undone.
                  </p>
                </div>

                <div className="modal-footer justify-content-center">
                  <button
                    className="btn btn-success px-3 py-1"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`btn btn-danger px-4 py-1 ${styles.deleteButton}`}
                    onClick={handleDeleteConfirmed}
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default Vehicle;