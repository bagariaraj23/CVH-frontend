export default function InventoryManagement() {
    const items = [
      { id: 1, name: 'Gloves', quantity: 100 },
      { id: 2, name: 'Masks', quantity: 200 },
      { id: 3, name: 'Sanitizers', quantity: 150 },
    ];
  
    return (
      <div className="bg-white shadow rounded p-4 h-96">
        <h3 className="text-lg font-semibold text-gray-700">Inventory Management</h3>
        <table className="min-w-full mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Item</th>
              <th className="py-2 px-4 border-b text-left">Quantity</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.quantity}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Item
        </button>
      </div>
    );
  }
  