export default function Pending() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-md text-center max-w-md">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">Please Hang Tight!</h1>
                <p className="text-gray-600 mb-6">
                    Your application is under review. We will notify you once it is processed.
                </p>
            </div>
        </div>
    );
}
