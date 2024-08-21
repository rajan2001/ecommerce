


interface CurrencyProps {
    value?: string | number
    currency?: string
}


export const Currency: React.FC<CurrencyProps> = ({ value, currency }) => {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    });

    return <div className="font-semibold">
        {formatter.format(Number(value))}
    </div>
}