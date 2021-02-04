import React from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

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

const shippingState = atom({
	key: 'shippingState',
	default: 'US',
});

const totalsState = selector({
	key: 'totalsState',
	get: ({ get }) => {
		const cart = get(cartState);
		const shipping = get(shippingState);
		const subTotal = Object.entries(cart).reduce(
			(acc, [id, quantity]) => acc + inventory[id].price * quantity,
			0
		);
		const shippingTotal = destinations[shipping];
		return {
			subTotal: subTotal,
			shipping: shippingTotal,
			total: subTotal + shippingTotal,
		};
	},
});

const App = () => {
	return (
		<div>
			<AvailableItems />
			<Cart />
		</div>
	);
};

const AvailableItems = () => {
	const [cart, setCart] = useRecoilState(cartState);
	return (
		<div>
			<h2>Available Items</h2>
			<pre>I am current state: {JSON.stringify(cart, null, 2)}</pre>
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
			<CartItems />
			<Shipping />
			<Totals />
		</div>
	);
};

const CartItems = () => {
	const cart = useRecoilValue(cartState);

	if (Object.keys(cart).length === 0) return <p>no items</p>;

	return (
		<ul>
			{Object.entries(cart).map(([id, quantity]) => (
				<li key={id}>
					{inventory[id].name}: {quantity}
				</li>
			))}
		</ul>
	);
};

const Shipping = () => {
	const [shipping, setShipping] = useRecoilState(shippingState);

	return (
		<div>
			<h2>
				{Object.entries(destinations).map(([country, price]) => (
					<button
						onClick={() => {
							setShipping(country);
						}}
					>
						{country} @ {price}
						{country === shipping ? <span> 'WHAT?!'</span> : null}
					</button>
				))}
			</h2>
		</div>
	);
};

const Totals = () => {
	const totals = useRecoilValue(totalsState);
	return (
		<div>
			<h3>Totals</h3>
			<p>Subtotal: ${totals.subTotal.toFixed(2)}</p>
			<p>Shipping: ${totals.shipping.toFixed(2)}</p>
			<p>
				<strong>Total: ${totals.total.toFixed(2)}</strong>
			</p>
		</div>
	);
};
export default App;
