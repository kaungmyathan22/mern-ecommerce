import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = ({ match }) => {

    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])
    console.log('====================================');
    console.log(products);
    console.log('====================================');
    return (
        <>
            <Meta />
            {!keyword && <ProductCarousel />}
            <h1>Latest Product</h1>
            {loading ? <Loader></Loader> : error ?
                <Message variant="danger">{error}</Message> :
                <>
                    <Row>
                        {products.map((product, index) => (
                            <Col key={index} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>}

        </>
    )
}

export default HomeScreen;
