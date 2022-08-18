import styles from '../styles/Home.module.css'
import { Prefetch } from '@layer0/react'
import { Fragment, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

async function getItem(id){
    try{
        const res = await fetch(`/api/shop/${id}`)
        return (await res.json()).data;
    }catch(e){
        return null;
    }
}

export default function Women(props) {

    const [page, setPage] = useState(props.page);
    const [items, setItems] = useState(props.items)
    const [loading, setLoading] = useState(false)

    const loadMore = async (e) => {
        if(!loading){
            setLoading(true)
            let newPage = page + 1;
            let itemsCopy = items;
            let fromPage = newPage-1 >= 0 ? newPage-1 : newPage;
            for(let i = fromPage*props.perPage; i < newPage*props.perPage; i++){
                itemsCopy.push(
                    await getItem(i)
                );
            }
            setItems(itemsCopy)
            setPage(newPage)
            setLoading(false)
        }
    }

    let itemsHtml = [];
    items.forEach((item, i) => {
        let prefetchItemUrl = `/api/shop/${i + props.page*props.perPage + 1}`; // prefetch future items
        itemsHtml.push(
            <Fragment key={`item-${i}`}>
                <Prefetch url={prefetchItemUrl}>
                    <div className={styles.item}>
                        <div className={styles.itemImgContainer}>
                            <LazyLoadImage src={item.img} alt=""/>
                        </div>
                        <span className={styles.title}>{item.title}</span>
                        <span className={styles.price}>${item.price}</span>
                        <span className={styles.id}>{item.id}</span>
                    </div>
                </Prefetch>
            </Fragment>
        );
    });
    return (
        <Fragment>
            <main className={styles.main}>
                {itemsHtml}
                <button key={"loadMore"} onClick={loadMore} className={`${styles.loadMore} ${loading ? styles.loading : ""}`}>Load more</button>
            </main>
        </Fragment>
    )
}


export async function getServerSideProps({ req, res }) {
    return {
        props: {
            page : 2,
            perPage : 12,
            items : [
                {"id":1,"title":"Studio Shoulder Bag With Quilting","price":76,"img":"/api/img/1"},
                {"id":2,"title":"Gotham Tall Tote In Signature Leather","price":193,"img":"/api/img/2"},
                {"id":3,"title":"Alana Tote In Signature Canvas","price":386,"img":"/api/img/3"},
                {"id":4,"title":"QA_AUTO Charter Backpack 18 In Colorblock","price":401,"img":"/api/img/4"},
                {"id":5,"title":"QA_AUTO Charter Backpack 18 In Colorblo","price":277,"img":"/api/img/5"},
                {"id":6,"title":"Soft Tabby Hobo In Signature Jacquard","price":273,"img":"/api/img/6"},
                {"id":7,"title":"Soft Tabby Hobo","price":43,"img":"/api/img/7"},
                {"id":8,"title":"Made To Order Women’s Sneaker","price":198,"img":"/api/img/8"},
                {"id":9,"title":"Studio Shoulder Bag With Quilting","price":325,"img":"/api/img/9"},
                {"id":10,"title":"Gotham Tall Tote In Signature Leather","price":447,"img":"/api/img/10"},
                {"id":11,"title":"Alana Tote In Signature Canvas","price":286,"img":"/api/img/11"},
                {"id":12,"title":"QA_AUTO Charter Backpack 18 In Colorblock","price":363,"img":"/api/img/12"},
                {"id":13,"title":"Studio Shoulder Bag With Quilting","price":76,"img":"/api/img/13"},
                {"id":14,"title":"Gotham Tall Tote In Signature Leather","price":193,"img":"/api/img/14"},
                {"id":15,"title":"Alana Tote In Signature Canvas","price":386,"img":"/api/img/15"},
                {"id":16,"title":"QA_AUTO Charter Backpack 18 In Colorblock","price":401,"img":"/api/img/16"},
                {"id":17,"title":"QA_AUTO Charter Backpack 18 In Colorblo","price":277,"img":"/api/img/17"},
                {"id":18,"title":"Soft Tabby Hobo In Signature Jacquard","price":273,"img":"/api/img/18"},
                {"id":19,"title":"Soft Tabby Hobo","price":43,"img":"/api/img/19"},
                {"id":20,"title":"Made To Order Women’s Sneaker","price":198,"img":"/api/img/20"},
                {"id":21,"title":"Studio Shoulder Bag With Quilting","price":325,"img":"/api/img/21"},
                {"id":22,"title":"Gotham Tall Tote In Signature Leather","price":447,"img":"/api/img/22"},
                {"id":23,"title":"Alana Tote In Signature Canvas","price":286,"img":"/api/img/23"},
                {"id":24,"title":"QA_AUTO Charter Backpack 18 In Colorblock","price":363,"img":"/api/img/24"}
            ]
        },
    }
}