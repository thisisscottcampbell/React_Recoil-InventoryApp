import React from 'react';
import {
	RecoilRoot,
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
} from 'recoil';

const inventory = {
	a: { name: 'Yerba Mate', price: 10 },
	b: { name: 'Coffee', price: 15 },
	c: { name: 'Tea', price: 7 },
};

const destinations = {
	US: 25,
	CA: 35,
	CO: 45,
};

const cartState = atom({
	key: 'cartState',
	default: {},
});

const App = () => {
	return (
		<RecoilRoot>
			<AvailableItems />
			<Cart />
		</RecoilRoot>
	);
};

const AvailableItems = () => {
	const [cart, setCart] = useRecoilState(cartState);
	return (
		<div>
			<h2>Available Items</h2>
			<pre>{JSON.stringify(cart, null, 2)}</pre>
			<ul>
				{Object.entries(inventory).map(([id, { name, price }]) => (
					<li key={id}>
						{name} @ ${price.toFixed(2)}
						<button
							onClick={() => {
								setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
							}}
						>
							add item
						</button>
						{cart[id] && (
							<button
								onClick={() => {
									const copy = { ...cart };
									if (copy[id] === 1) {
										delete copy[id];
										setCart(copy);
									} else {
										setCart({ ...copy, [id]: copy[id] - 1 });
									}
								}}
							>
								x
							</button>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

const Cart = () => {
	return (
		<div>
			<h2>Cart</h2>
		</div>
	);
};
export default App;
