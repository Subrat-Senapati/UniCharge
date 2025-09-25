import React, { useEffect, useState } from "react";
import { Card, Button, Form, Modal, Spinner } from "react-bootstrap";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  // Track which section modal is open
  const [editSection, setEditSection] = useState(null);
  const [formData, setFormData] = useState({});

  // 🔹 Fetch user details (dummy for now)
  useEffect(() => {
    const fetchUser = async () => {
      const dummyData = {
        fullName: "John Doe",
        email: "johndoe@example.com",
        phoneNumber: "9876543210",
        role: "user",
        authProvider: "local",
        vehicle: {
          make: "Tesla",
          model: "Model 3",
          batteryCapacityKwh: 75,
          preferredConnector: "CCS2",
        },
        wallet: {
          balance: 500.75,
          loyaltyPoints: 120,
          defaultPaymentMethod: "Card - 1234",
        },
        paymentMethods: [
          {
            _id: "1",
            type: "card",
            card: {
              cardNumberMasked: "1234",
              cardHolder: "John Doe",
              expiryMonth: "12",
              expiryYear: "25",
            },
            isDefault: true,
          },
          {
            _id: "2",
            type: "upi",
            upiId: "johndoe@upi",
            isDefault: false,
          },
        ],
        location: {
          city: "Bengaluru",
          state: "Karnataka",
          country: "India",
          coordinates: { lat: 12.9716, lng: 77.5946 },
        },
        preferences: {
          preferredLanguage: "en",
          notificationsEnabled: true,
          renewablePriority: false,
        },
      };
      setUser(dummyData);
    };

    fetchUser();
  }, []);

  const handleOpenEdit = (section) => {
    setEditSection(section);
    setFormData(user[section] || {}); // load only that section's data
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      [editSection]: formData,
    }));
    console.log("Updated", editSection, formData);
    setEditSection(null);
  };

  if (!user) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">User Dashboard</h2>

      {/* Profile Section */}
      <Card className="mb-3 shadow-sm">
        <Card.Header className="d-flex justify-content-between">
          <span>Profile</span>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleOpenEdit("profile")}
          >
            Edit
          </Button>
        </Card.Header>
        <Card.Body>
          <p>
            <strong>Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phoneNumber}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Auth Provider:</strong> {user.authProvider}
          </p>
        </Card.Body>
      </Card>

      {/* Vehicle Section */}
      <Card className="mb-3 shadow-sm">
        <Card.Header className="d-flex justify-content-between">
          <span>Vehicle</span>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleOpenEdit("vehicle")}
          >
            Edit
          </Button>
        </Card.Header>
        <Card.Body>
          <p>
            <strong>Make:</strong> {user.vehicle?.make}
          </p>
          <p>
            <strong>Model:</strong> {user.vehicle?.model}
          </p>
          <p>
            <strong>Battery:</strong> {user.vehicle?.batteryCapacityKwh} kWh
          </p>
          <p>
            <strong>Connector:</strong> {user.vehicle?.preferredConnector}
          </p>
        </Card.Body>
      </Card>

      {/* Wallet Section */}
      <Card className="mb-3 shadow-sm">
        <Card.Header className="d-flex justify-content-between">
          <span>Wallet</span>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleOpenEdit("wallet")}
          >
            Edit
          </Button>
        </Card.Header>
        <Card.Body>
          <p>
            <strong>Balance:</strong> ₹{user.wallet?.balance}
          </p>
          <p>
            <strong>Loyalty Points:</strong> {user.wallet?.loyaltyPoints}
          </p>
          <p>
            <strong>Default Payment Method:</strong>{" "}
            {user.wallet?.defaultPaymentMethod}
          </p>
        </Card.Body>
      </Card>

      {/* Location Section */}
      <Card className="mb-3 shadow-sm">
        <Card.Header className="d-flex justify-content-between">
          <span>Location</span>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleOpenEdit("location")}
          >
            Edit
          </Button>
        </Card.Header>
        <Card.Body>
          <p>
            <strong>City:</strong> {user.location?.city}
          </p>
          <p>
            <strong>State:</strong> {user.location?.state}
          </p>
          <p>
            <strong>Country:</strong> {user.location?.country}
          </p>
          <p>
            <strong>Coordinates:</strong>{" "}
            {user.location?.coordinates?.lat}, {user.location?.coordinates?.lng}
          </p>
        </Card.Body>
      </Card>

      {/* Preferences Section */}
      <Card className="mb-3 shadow-sm">
        <Card.Header className="d-flex justify-content-between">
          <span>Preferences</span>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleOpenEdit("preferences")}
          >
            Edit
          </Button>
        </Card.Header>
        <Card.Body>
          <p>
            <strong>Language:</strong> {user.preferences?.preferredLanguage}
          </p>
          <p>
            <strong>Notifications:</strong>{" "}
            {user.preferences?.notificationsEnabled ? "Enabled" : "Disabled"}
          </p>
          <p>
            <strong>Renewable Priority:</strong>{" "}
            {user.preferences?.renewablePriority ? "Yes" : "No"}
          </p>
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      <Modal show={!!editSection} onHide={() => setEditSection(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {editSection}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {editSection === "profile" && (
              <>
                <Form.Group className="mb-2">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}

            {editSection === "vehicle" && (
              <>
                <Form.Group className="mb-2">
                  <Form.Label>Make</Form.Label>
                  <Form.Control
                    type="text"
                    name="make"
                    value={formData.make || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={formData.model || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Battery (kWh)</Form.Label>
                  <Form.Control
                    type="number"
                    name="batteryCapacityKwh"
                    value={formData.batteryCapacityKwh || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}

            {editSection === "wallet" && (
              <>
                <Form.Group className="mb-2">
                  <Form.Label>Balance</Form.Label>
                  <Form.Control
                    type="number"
                    name="balance"
                    value={formData.balance || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Loyalty Points</Form.Label>
                  <Form.Control
                    type="number"
                    name="loyaltyPoints"
                    value={formData.loyaltyPoints || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}

            {editSection === "location" && (
              <>
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={formData.state || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.country || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}

            {editSection === "preferences" && (
              <>
                <Form.Group className="mb-2">
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    type="text"
                    name="preferredLanguage"
                    value={formData.preferredLanguage || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Enable Notifications"
                  name="notificationsEnabled"
                  checked={formData.notificationsEnabled || false}
                  onChange={handleChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Renewable Priority"
                  name="renewablePriority"
                  checked={formData.renewablePriority || false}
                  onChange={handleChange}
                />
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditSection(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;