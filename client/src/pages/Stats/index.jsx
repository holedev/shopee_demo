import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './Stats.module.css';
import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { authApis, axiosAPI, endpoints } from '~/config/axiosAPI';
import Chart from './Chart';
import { handleMoneyVND } from '~/utiils/money';
import { useLoadingContext } from '~/hook';

function Stats() {
  const { id } = useParams();
  const nav = useNavigate();
  const [q] = useSearchParams();

  const [loading, setLoading] = useLoadingContext();

  const [cates, setCates] = useState([]);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    cateId: '',
    productId: '',
    year: '',
    quarter: '',
    month: '',
  });
  const [stats, setStats] = useState([]);

  const getURLFilter = () => {
    let searchParams = ``;
    searchParams += `?cateId=${filter.cateId.trim()}`;
    if (filter.productId.trim())
      searchParams += `&productId=${filter.productId}`;
    if (filter.year.trim()) searchParams += `&year=${filter.year}`;
    if (filter.quarter.trim()) searchParams += `&quarter=${filter.quarter}`;
    if (filter.month.trim()) searchParams += `&month=${filter.month}`;

    return searchParams;
  };

  const getCates = async () => {
    await axiosAPI
      .get(endpoints.categories)
      .then((res) => {
        setCates(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getProductByCate = async () => {
    let endpoint = endpoints.stats + `get-pro-by-cate/`;
    if (filter.cateId.trim()) endpoint += `?cateId=${filter.cateId.trim()}`;

    await authApis()
      .get(endpoint)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleFilter = (value, field) => {
    setFilter((prev) => {
      return {
        ...prev,
        quarter: field == 'month' ? '' : prev.quarter,
        month: field == 'quarter' ? '' : prev.month,
        [field]: value,
      };
    });
  };

  const getStats = async () => {
    if (loading) return;
    setLoading(true);
    let endpoint = `${endpoints.stats}` + getURLFilter();
    await authApis()
      .get(endpoint)
      .then((res) => {
        const data = res.data?.map((item) => {
          return {
            id: item[0],
            name: item[1],
            totalPrice: item[2],
          };
        });
        setStats(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getProductByCate();
    getCates();
  }, []);

  useEffect(() => {
    nav(getURLFilter());
  }, [
    filter.productId,
    filter.cateId,
    filter.year,
    filter.quarter,
    filter.month,
  ]);

  useEffect(() => {
    getProductByCate();
  }, [filter.cateId]);

  useEffect(() => {
    getStats();
  }, [q]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <Form className='ms-auto d-flex gap-2'>
          <Form.Select
            value={filter.cateId}
            onChange={(e) => handleFilter(e.target.value, 'cateId')}
            size='small'
            id='cate'
            aria-label=''
          >
            <option value=''>Chọn danh mục</option>
            {cates.length > 0 ? (
              cates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))
            ) : (
              <option value=''>Hiện chưa có danh mục nào!</option>
            )}
          </Form.Select>
          <Form.Select
            value={filter.productId}
            onChange={(e) => handleFilter(e.target.value, 'productId')}
            size='small'
            id='product'
            aria-label=''
          >
            <option value=''>Chọn sản phẩm</option>
            {products.length > 0 ? (
              products.map((p) => (
                <option title={p.name} key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))
            ) : (
              <option value=''>Hiện chưa có sản phẩm nào!</option>
            )}
          </Form.Select>

          <Form.Select
            value={filter.year}
            onChange={(e) => handleFilter(e.target.value, 'year')}
            size='small'
            id='year'
            aria-label=''
          >
            <option value=''>Chọn năm</option>
            {[...Array(10)].map((item, idx) => (
              <option key={idx} value={idx + 2020}>
                {idx + 2020}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            value={filter.quarter}
            onChange={(e) => handleFilter(e.target.value, 'quarter')}
            size='small'
            id='quarter'
            aria-label=''
          >
            <option value=''>Chọn quý</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
          </Form.Select>
          <Form.Select
            value={filter.month}
            onChange={(e) => handleFilter(e.target.value, 'month')}
            size='small'
            id='month'
            aria-label=''
          >
            <option value=''>Chọn tháng</option>
            {[...Array(12)].map((item, idx) => (
              <option key={idx} value={idx + 1}>
                {idx + 1}
              </option>
            ))}
          </Form.Select>
        </Form>
      </div>
      <div
        style={{
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Chart stats={stats} />
      </div>
    </div>
  );
}

export default Stats;
