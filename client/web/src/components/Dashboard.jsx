import { useState } from "react";
import { Card, Button, ListGroup, Badge } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import styles from "../css/dashboard.module.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);

  if (!user) {
    return (
      <div className={styles.loadingContainer}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  const latestTransaction = user.paymentHistory?.[0];
  const defaultPayment =
    user.paymentMethods?.find((m) => m._id === user.wallet?.defaultPaymentMethod);

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.dashboardTitle}>Welcome, {user.fullName}</h2>

      <div className={styles.cardStack}>
        {/* ===== PROFILE CARD ===== */}
        <Card className={styles.card}>
          <Card.Header className={styles.cardHeader}>Profile</Card.Header>
          <Card.Body>
            <p><strong>Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phoneNumber}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Auth Provider:</strong> {user.authProvider}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </Card.Body>
        </Card>

        {/* ===== WALLET CARD ===== */}
        <Card className={styles.card}>
          <Card.Header className={styles.cardHeader}>Wallet</Card.Header>
          <Card.Body>
            <h4 className={styles.walletBalance}>₹{user.wallet?.balance || 0}</h4>
            <p className={styles.walletSub}>Loyalty Points: {user.wallet?.loyaltyPoints}</p>
            <hr />
            <p>
              <strong>Default Payment:</strong>{" "}
              {defaultPayment
                ? defaultPayment.type === "upi"
                  ? `${defaultPayment.upiId} (UPI)`
                  : `****${defaultPayment.card.cardNumberMasked} (Card)`
                : "N/A"}
            </p>
          </Card.Body>
        </Card>

        {/* ===== VEHICLES CARD ===== */}
        <Card className={styles.card}>
          <Card.Header className={styles.cardHeader}>
            Vehicles
            {user.vehicles?.length > 3 && (
              <Button
                className="py-1 px-2 text-decoration-none"
                variant="link"
                size="sm"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Hide" : "Show All"}
              </Button>
            )}
          </Card.Header>
          <ListGroup variant="flush">
            {(expanded ? user.vehicles : user.vehicles?.slice(0, 3))?.map((v) => (
              <ListGroup.Item key={v._id}>
                <div className={styles.vehicleItem}>
                  <div>
                    <strong>{v.make} {v.model}</strong>
                    <div className={styles.vehicleDetails}>
                      {v.batteryCapacityKwh} kWh • {v.preferredConnector}
                    </div>
                  </div>
                  <Badge bg="light" text="dark">
                    {new Date(v.createdAt).toLocaleDateString()}
                  </Badge>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>

        {/* ===== PAYMENT METHODS ===== */}
        <Card className={styles.card}>
          <Card.Header className={styles.cardHeader}>Payment Methods</Card.Header>
          <ListGroup variant="flush">
            {user.paymentMethods?.map((method) => (
              <ListGroup.Item key={method._id}>
                {method.type === "upi" ? (
                  <>
                    <strong>UPI:</strong> {method.upiId}
                    {method.isDefault && <Badge bg="success" className="ms-2">Default</Badge>}
                  </>
                ) : (
                  <>
                    <strong>Card:</strong> ****{method.card.cardNumberMasked} •{" "}
                    {method.card.cardHolder} ({method.card.expiryMonth}/{method.card.expiryYear})
                    {method.isDefault && <Badge bg="success" className="ms-2">Default</Badge>}
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>

        {/* ===== PAYMENT HISTORY ===== */}
        <Card className={styles.card}>
          <Card.Header className={styles.cardHeader}>Recent Transaction</Card.Header>
          {latestTransaction ? (
            <Card.Body>
              <p><strong>Type:</strong> {latestTransaction.type}</p>
              <p><strong>Amount:</strong> ₹{latestTransaction.amount}</p>
              <p><strong>Method:</strong> {latestTransaction.method}</p>
              <p><strong>Vehicle:</strong> {latestTransaction.vehicleName}</p>
              <p><strong>Station:</strong> {latestTransaction.stationName}</p>
              <p><strong>Status:</strong> <Badge bg="info">{latestTransaction.status}</Badge></p>
              <p><small>{new Date(latestTransaction.createdAt).toLocaleString()}</small></p>
            </Card.Body>
          ) : (
            <Card.Body>No recent transactions.</Card.Body>
          )}
        </Card>

        {/* ===== NOTIFICATIONS ===== */}
        <Card className={styles.card}>
          <Card.Header className={styles.cardHeader}>Notifications</Card.Header>
          <ListGroup variant="flush">
            {user.notifications?.length > 0 ? (
              user.notifications.map((n) => (
                <ListGroup.Item
                  key={n._id}
                  className={n.isRead ? styles.readNotification : styles.unreadNotification}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <strong>{n.title}</strong>
                      <div>{n.message}</div>
                    </div>
                    <Badge bg={n.isRead ? "secondary" : "primary"}>
                      {n.type}
                    </Badge>
                  </div>
                  <small className="text-muted">
                    {new Date(n.createdAt).toLocaleString()}
                  </small>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No notifications available.</ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;