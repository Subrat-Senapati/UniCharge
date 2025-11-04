import Payment from './Payment'
import WalletCard from './WalletCard';

const demoWallet = {
  balance: 520.75,
  loyaltyPoints: 120,
  defaultPaymentMethod: "Card - **** 4587",
};


const Wallet = () => {

  return (
    <div>
      <WalletCard wallet={demoWallet} onAddBalance={() => alert("Add Balance")} />
      <Payment />
    </div>
  )
}

export default Wallet