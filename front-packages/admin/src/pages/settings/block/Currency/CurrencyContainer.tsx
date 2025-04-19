import { Fragment, useState, useEffect } from 'react';
import { Container } from '@/components/container';
import { Currencies } from './Currencies'
import apiFetcher from '@/fetcher/apiFetcher';


const CurrencyContainer = () => {

    const [currenciesData, setCurrenciesData] = useState([]);
    const [numberOfItems, setItems] = useState(0);
    const defaultPagination = {
        first: "",
        last: "",
        next:"",
        previous: ""
    };
    const [pagination, setPagination] = useState(defaultPagination);

    const fetchData =  async (filters: string = "") => {
        // setLoading(true);
        try {
            const response: any = await apiFetcher.get(`/currencies${filters}`);
            setItems(response.totalItems);
            setCurrenciesData(response.member);
            setPagination(response.view);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Fragment>
            <Container>
                <Currencies 
                    currenciesData={currenciesData}
                    numberOfItems={numberOfItems} 
                    pagination={pagination}
                    onFilterChange={fetchData}
                />
            </Container>
        </Fragment>
    );
};

export { CurrencyContainer };
