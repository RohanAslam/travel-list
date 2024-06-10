import { useState } from "react";
import "./index.css";

export default function App() {
  const [items, setItems] = useState([]);

  const handleDeleteItems = function (id) {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handlerPacked = function (id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form items={items} setItems={setItems} />
      <List
        items={items}
        setItems={setItems}
        onDelete={handleDeleteItems}
        onCheck={handlerPacked}
      />
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

function List({ items, setItems, onDelete, onCheck }) {
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
              onCheck={onCheck}
            />
          ))}
      </ul>
    </div>
  );
}

function Item({
  item: { description, quantity, id, packed },
  onDelete,
  onCheck,
}) {
  return (
    <li>
      <input type="checkbox" value={packed} onClick={() => onCheck(id)} />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {description + " "}
        {quantity}
      </span>
      <button onClick={() => onDelete(id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  let thingsChecked = 0;
  items.forEach((item) => {
    item.packed ? (thingsChecked += 1) : (thingsChecked += 0);
  });

  console.log(thingsChecked);

  return (
    <footer className="stats">
      You have {items.length} items in your packing list (
      {thingsChecked === 0
        ? "0"
        : Math.round((thingsChecked / items.length) * 100)}
      % completed)
    </footer>
  );
}
