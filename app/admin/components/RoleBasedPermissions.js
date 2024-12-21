// components/RoleBasedPermissions.js

export const RoleBasedPermissions = () => {
    const roles = [
      {
        role: 'Admin',
        permissions: 'All Access',
      },
      {
        role: 'Editor',
        permissions: 'Edit Content',
      },
      // ...additional roles
    ];
  
    return (
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Role-based Permissions</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Permissions</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{item.role}</td>
                <td className="py-2 px-4 border-b">{item.permissions}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  