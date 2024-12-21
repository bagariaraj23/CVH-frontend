// components/SubscriptionPlans.js

export const SubscriptionPlans = () => {
    const plans = [
      {
        plan: 'Basic',
        price: '$10/month',
        users: 100,
      },
      {
        plan: 'Pro',
        price: '$30/month',
        users: 500,
      },
      // ...additional plans
    ];
  
    return (
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-bold mb-4">Subscription Plans</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Plan</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Users</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{item.plan}</td>
                <td className="py-2 px-4 border-b">{item.price}</td>
                <td className="py-2 px-4 border-b">{item.users}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  