interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
  
  interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
  }
  interface CustomProps {
    // Define your custom props here
  }

  type Props = React.PropsWithChildren<CustomProps>;

  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
    //add callback and type for blockchain
    const getPriority = useCallback((blockchain: string): number => {
      switch (blockchain) {
        case 'Osmosis':
          return 100;
        case 'Ethereum':
          return 50;
        case 'Arbitrum':
          return 30;
        case 'Zilliqa':
          return 20;
        case 'Neo':
          return 20;
        default:
          return -99;
      }
    }, []);
  //refactor filter logic
    const sortedBalances = useMemo(() => {
      return balances
        .filter((balance: WalletBalance) => getPriority(balance?.blockchain) > -99 && balance?.amount > 0)
        .sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
    }, [balances]);

    //remove unused function
    // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    //     return {
    //       ...balance,
    //       formatted: balance.amount.toFixed()
    //     }
    //   })

    const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
      const usdValue = prices[balance?.currency] * balance?.amount;
      return (
        <WalletRow
          className={classes?.row}
          key={index}
          amount={balance?.amount || 0}
          usdValue={usdValue}
          formattedAmount={balance?.amount.toFixed()}
        />
      );
    });
  
    return <div {...rest}>{rows}</div>;
  };
  
