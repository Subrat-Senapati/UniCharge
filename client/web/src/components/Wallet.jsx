import Payment from './Payment'
import WalletCard from './WalletCard';

const Wallet = () => {
  return (
    <div className="container mx-auto mt-8 px-4">
      <WalletCard />
      <Payment />
    </div>
  )
}

export default Wallet