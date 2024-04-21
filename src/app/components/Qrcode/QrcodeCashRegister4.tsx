'use client';
import { useEffect, useState, Suspense } from 'react';
import QrcodeReader from './QrcodeReader';
import UserTokenComponent from './UserTokenComponent';

interface Product {
    product_id: number;
    product_qrcode: number;
    product_name: string;
    including_tax_price: number;
    quantity: number;
    favorite: boolean;
    image_url: string;
}

interface Purchase {
    product_name: string;
    quantity: number;
    registration_date: string;
    image_url: string
}


interface FavoriteProduct {
    product_name: string;
    including_tax_price: number;
    image_url: string;
}


interface User {
    user_id: number;
    user_name: string;
}

export function QrcodeReaderComponent() {
    const [scannedTime, setScannedTime] = useState(new Date());
    const [scannedResult, setScannedResult] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState<number | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [recentPurchases, setRecentPurchases] = useState<Purchase[]>([]);
    const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>([]);

    const handleFavoriteChange = (productId :number, isChecked :boolean) => {
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.product_id === productId) {
                    return { ...product, favorite: isChecked };
                }
                return product;
            });
        });
    };

    useEffect(() => {
        const fetchMyPageData = async () => {
            if (token) {
                try {
                    const response = await fetch(`https://tech0-gen-5-step4-studentwebapp-1.azurewebsites.net/mypage?token=${token}`, { cache: "no-cache" });
                    if (!response.ok) {
                        throw new Error('Failed to fetch my page data');
                    }
                    const data = await response.json();
                    setRecentPurchases(data.recent_purchases);
                    setFavoriteProducts(data.favorite_products);
                } catch (error) {
                    console.error("Failed to fetch my page data:", error);
                }
            }
        };
        fetchMyPageData();
    }, [token]);

    async function fetchUser(token: string): Promise<User> {
        const response = await fetch(`https://tech0-gen-5-step4-studentwebapp-1.azurewebsites.net/shopping?token=${token}`, { cache: "no-cache" });
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return response.json();
    }

    useEffect(() => {
        const fetchAndSetUser = async () => {
            if (token) {
                try {
                    const userData = await fetchUser(token);
                    console.log("APIからの応答:", userData);
    
                    if (userData.user_id !== undefined) {
                        setUserName(userData.user_name);
                        setUserId(userData.user_id);
                    } else {
                        console.log("応答にuser_idが含まれていません。");
                    }
                } catch (error) {
                    console.error("ユーザー情報の取得中にエラーが発生しました:", error);
                }
            }
        };
        fetchAndSetUser();
    }, [token]);

    useEffect(() => {
        if (userId !== null) {
            console.log(`userIdが更新されました: ${userId}`);
        }
    }, [userId]);

    const onNewScanResult = (result: any) => {
        console.log('QRコードスキャン結果', result);
        setScannedTime(new Date());
        setScannedResult(result);
    };

    async function fetchProduct(scannedResult: any) {
        const encodedQrcode = encodeURIComponent(scannedResult);
        const res = await fetch(`https://tech0-gen-5-step4-studentwebapp-1.azurewebsites.net/qrcode?qrcode=${encodedQrcode}`, { cache: "no-cache" });
        if (!res.ok) {
            throw new Error('Failed to fetch product');
        }
        return res.json();
    }

    useEffect(() => {
        const fetchAndSetProduct = async () => {
            if (scannedResult) {
                try {
                    const newProductData = await fetchProduct(scannedResult);
                    const productToAdd = { ...newProductData, favorite: false, quantity: 1 };
                    setProducts(prevProducts => {
                        const existingProductIndex = prevProducts.findIndex(p => p.product_id === productToAdd.product_id);
                        if (existingProductIndex !== -1) {
                            const updatedProducts = [...prevProducts];
                            updatedProducts[existingProductIndex] = {
                                ...updatedProducts[existingProductIndex],
                                quantity: updatedProducts[existingProductIndex].quantity + 1,
                            };
                            return updatedProducts;
                        }
                        return [...prevProducts, productToAdd];
                    });
                    setScannedResult('');
                } catch (error) {
                    console.error("Failed to fetch and set product:", error);
                }
            }
        };
        fetchAndSetProduct();
    }, [scannedTime, scannedResult]);

    const registerProducts = async () => {
        if (!userId || !token) {
            alert('ユーザー情報または認証トークンを取得できませんでした。');
            return;
        }
    
        try {
            const registerPromises = products.map(product => {
                const productData = {
                    user_id: userId,
                    product_id: product.product_id,
                    quantity: product.quantity,
                    favorite: product.favorite,
                    registration_date: new Date()
                };
    
                return fetch('https://tech0-gen-5-step4-studentwebapp-1.azurewebsites.net/purchase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(productData),
                });
            });
    
            await Promise.all(registerPromises);
            alert('商品情報を登録しました。');
            setProducts([]);
        } catch (error) {
            console.error("Failed to register products:", error);
            alert('商品情報の登録に失敗しました。');
        }
    };


    return (
        <>
        <div>ようこそ {userName}さん！</div>
            <div className="p-4">
            <Suspense fallback={<div>Loading token...</div>}>
                <UserTokenComponent setToken={setToken} />
            </Suspense>
                <h2 className="text-2xl font-bold mb-4">QRコードスキャン結果</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map((product, index) => (
                        <div key={index} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title">{product.product_name}</h3>
                                <p>価格: ¥{product.including_tax_price}</p>
                                <p>数量: {product.quantity}</p>
                                <div className="card-actions justify-end">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">お気に入り</span>
                                        <input type="checkbox" className="toggle toggle-accent" checked={product.favorite} onChange={e => handleFavoriteChange(product.product_id, e.target.checked)} />
                                    </label>
                                </div>

                                <Suspense fallback={<div>Loading...</div>}>
                                    <UserTokenComponent setToken={setToken} />
                                </Suspense>
                                <QrcodeReader onScanSuccess={onNewScanResult} onScanFailure={(error: any) => console.error('QR scan error', error)} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="py-4">
                    <button className="btn btn-primary" onClick={registerProducts}>登録</button>
                </div>
            </div>
            <QrcodeReader onScanSuccess={onNewScanResult} onScanFailure={(error: any) => console.error('QR scan error', error)} />

            
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">直近の購入履歴</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentPurchases.map((purchase, index) => (
                        <div key={index} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title">{purchase.product_name}</h3>
                                <img src={purchase.image_url} alt={purchase.product_name} style={{ width: '100%', height: 'auto' }}/>
                                <p>数量: {purchase.quantity}</p>
                                <p>購入日: {new Date(purchase.registration_date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">お気に入り商品</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoriteProducts.map((product, index) => (
                        <div key={index} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title">{product.product_name}</h3>
                                <img src={product.image_url} alt={product.product_name} style={{ width: '100%', height: 'auto' }}/>
                                <p>価格: ¥{product.including_tax_price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default QrcodeReaderComponent;
