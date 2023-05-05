import { QueryConfig } from '../ProductList'
import { sortBy, order as orderConstant } from 'src/constants/Product'
import { ProductListConfig } from 'src/types/producr.type'
import classNames from 'classnames'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Path from 'src/constants/Path'
import { omit } from 'lodash'
import { spawn } from 'child_process'

interface props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function ShortProductList({ queryConfig, pageSize }: props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handlesort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: Path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: Path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }
  return (
    <div className='  bg-gray-300/40 py-4 px-3'>
      <div className=' flex flex-wrap items-center justify-between gap-2'>
        <div className=' item-center flex  flex-wrap gap-2'>
          <div className=' flex items-center'>Sắp xếp theo</div>
          <button
            className={classNames(' h-8 px-4 text-center text-sm capitalize ', {
              'bg-orange text-white hover:bg-opacity-80': isActiveSortBy(sortBy.view),
              'hover: bg-white bg-slate-200 text-black': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handlesort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames(' h-8 px-4 text-center text-sm capitalize ', {
              'bg-orange text-white hover:bg-opacity-80': isActiveSortBy(sortBy.createdAt),
              'hover: bg-white bg-slate-200 text-black': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handlesort(sortBy.createdAt)}
          >
            Mới nhất
          </button>

          <button
            className={classNames(' h-8 px-4 text-center text-sm capitalize ', {
              'bg-orange text-white hover:bg-opacity-80': isActiveSortBy(sortBy.sold),
              'hover: bg-white bg-slate-200 text-black': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handlesort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames(' h-8 px-4 text-left text-sm capitalize outline-none', {
              'bg-orange text-white hover:bg-opacity-80': isActiveSortBy(sortBy.price),
              'hover: bg-white bg-slate-200 text-black': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={orderConstant.asc} className='bg-white text-black'>
              {' '}
              Giá: Thấp đến cao{' '}
            </option>
            <option value={orderConstant.desc} className='bg-white text-black'>
              Giá: Cao đến thấp{' '}
            </option>
          </select>
        </div>
        <div className=' flex items-center'>
          <div>
            <span className=' text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2'>
            <div className='flex items-center'>
              {page === 1 ? (
                <span className=' flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm bg-white/60  hover:bg-slate-300'>
                  <svg viewBox='0 0 7 11' className=' h-3 w-3'>
                    <path
                      d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                      fillRule='nonzero'
                    />
                  </svg>
                </span>
              ) : (
                <Link
                  to={{
                    pathname: Path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      page: (page - 1).toString()
                    }).toString()
                  }}
                  className=' flex h-8  items-center rounded-tl-sm bg-white/60 px-3 hover:bg-slate-300'
                >
                  <svg viewBox='0 0 7 11' className=' h-3 w-3'>
                    <path
                      d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                      fillRule='nonzero'
                    />
                  </svg>
                </Link>
              )}
              {page === pageSize ? (
                <span className=' flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm bg-white/60  hover:bg-slate-300'>
                  <svg viewBox='0 0 7 11' className=' h-3 w-3'>
                    <path
                      d='M2.305922 9.81856l4.4069956-4.385381c.1957415-.194782.1965198-.511364.0017382-.707105a.26384055.26384055 0 0 0-.000868-.00087L2.2618625.273278 2.26115.273991C2.1199955.146113 1.9327221.068212 1.7272539.068212c-.4393237 0-.7954659.356142-.7954659.795466 0 .205468.077901.392741.205779.533896l-.0006632.000663.0226101.02261c.0034906.003557.0070143.00708.0105706.010571L4.5319862 4.79332c.1562097.156209.1562097.409475 0 .565685-.0002318.000232-.0004639.000463-.0006962.000694L1.1382882 8.73606l.0009482.000953c-.128869.141365-.2074484.329372-.2074484.535733 0 .439324.3561422.795466.7954659.795466.2049545 0 .391805-.077512.5328365-.204821l.0003877.00039.0097205-.009673c.012278-.011471.0241922-.023327.0357234-.035548z'
                      fillRule='nonzero'
                    />
                  </svg>
                </span>
              ) : (
                <Link
                  to={{
                    pathname: Path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      page: (page + 1).toString()
                    }).toString()
                  }}
                  className=' flex h-8  items-center rounded-tl-sm bg-white/60 px-3 hover:bg-slate-300'
                >
                  <svg viewBox='0 0 7 11' className=' h-3 w-3'>
                    <path
                      d='M2.305922 9.81856l4.4069956-4.385381c.1957415-.194782.1965198-.511364.0017382-.707105a.26384055.26384055 0 0 0-.000868-.00087L2.2618625.273278 2.26115.273991C2.1199955.146113 1.9327221.068212 1.7272539.068212c-.4393237 0-.7954659.356142-.7954659.795466 0 .205468.077901.392741.205779.533896l-.0006632.000663.0226101.02261c.0034906.003557.0070143.00708.0105706.010571L4.5319862 4.79332c.1562097.156209.1562097.409475 0 .565685-.0002318.000232-.0004639.000463-.0006962.000694L1.1382882 8.73606l.0009482.000953c-.128869.141365-.2074484.329372-.2074484.535733 0 .439324.3561422.795466.7954659.795466.2049545 0 .391805-.077512.5328365-.204821l.0003877.00039.0097205-.009673c.012278-.011471.0241922-.023327.0357234-.035548z'
                      fillRule='nonzero'
                    />
                  </svg>
                </Link>
              )}

              {/* <button className=' h-8  rounded-tr-sm rounded-br-sm bg-white/60 px-3 hover:bg-slate-300'>
                <svg viewBox='0 0 7 11' className=' h-3 w-3'>
                  <path
                    d='M2.305922 9.81856l4.4069956-4.385381c.1957415-.194782.1965198-.511364.0017382-.707105a.26384055.26384055 0 0 0-.000868-.00087L2.2618625.273278 2.26115.273991C2.1199955.146113 1.9327221.068212 1.7272539.068212c-.4393237 0-.7954659.356142-.7954659.795466 0 .205468.077901.392741.205779.533896l-.0006632.000663.0226101.02261c.0034906.003557.0070143.00708.0105706.010571L4.5319862 4.79332c.1562097.156209.1562097.409475 0 .565685-.0002318.000232-.0004639.000463-.0006962.000694L1.1382882 8.73606l.0009482.000953c-.128869.141365-.2074484.329372-.2074484.535733 0 .439324.3561422.795466.7954659.795466.2049545 0 .391805-.077512.5328365-.204821l.0003877.00039.0097205-.009673c.012278-.011471.0241922-.023327.0357234-.035548z'
                    fillRule='nonzero'
                  />
                </svg>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
