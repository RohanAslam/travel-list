import { useState } from "react";
import "./index.css";

export default function App() {
  const [items, setItems] = useState([]);

  const handleDeleteItems = function (id) {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <Logo />
      <Form items={items} setItems={setItems} />
      <List items={items} setItems={setItems} onDelete={handleDeleteItems} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 💼</h1>;
}

function Form({ items, setItems }) {
  const [descriptions, setDescription] = useState("");

  const [selectQuantity, setSelectQuantity] = useState(1);

  const handlerItem = function (e) {
    e.preventDefault();

    if (!descriptions) return;

    const newItem = {
      id: items.length + 1,
      description: descriptions,
      quantity: selectQuantity,
      packed: false,
    };

    setDescription("");
    setSelectQuantity(1);
    setItems((items) => [...items, newItem]);
  };

  return (
    <form className="add-form" onSubmit={handlerItem}>
      <h3>What do you need for your trip?</h3>
      <select
        type="number"
        value={selectQuantity}
        onChange={(e) => setSelectQuantity(Number(e.target.value))}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={descriptions}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>add</button>
    </form>
  );
}

function List({ items, setItems, onDelete }) {
  return (
    <div className="list">
      <ul>
        {items &&
          items.map((item) => (
            <Item
              item={item}
              key={item.id}
              setItems={setItems}
              onDelete={onDelete}
            />
          ))}
      </ul>
    </div>
  );
}

function Item({ item: { description, quantity, id }, setItems, onDelete }) {
  const [checked, setChecked] = useState(false);

  const handlerPacked = function (e) {
    checked ? setChecked(false) : setChecked(true);
  };

  return (
    <li>
      <input type="checkbox" value={checked} onClick={handlerPacked} />
      <span style={checked ? { textDecoration: "line-through" } : {}}>
        {description + " "}
        {quantity}
      </span>
      <button onClick={() => onDelete(id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  return (
    <footer className="stats">
      You have {items.length} items in your packing list (X% completed)
    </footer>
  );
}
