import clsx from 'clsx';

const Attributes = () => {
    return (
        <div>
            <div className="border-2">
                <form
                    className="flex flex-col gap-5 p-10"
                    noValidate
                >

                    <div className="flex flex-col gap-1">
                        <label className="form-label text-gray-900">Name</label>
                        <label className="input">
                            <input
                                placeholder="Enter username"
                                className={clsx('form-control')}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="form-label text-gray-900">Description</label>
                        <label className="input">
                            <textarea
                                placeholder="Enter username"
                                className={clsx('form-control')}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="form-label text-gray-900">Short Description</label>
                        <label className="input">
                            <input
                                placeholder="Enter username"
                                className={clsx('form-control')}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="form-label text-gray-900">Price</label>
                        <label className="input">
                            <input
                                placeholder="Enter username"
                                className={clsx('form-control')}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="form-label text-gray-900">Meta title</label>
                        <label className="input">
                            <input
                                placeholder="Enter username"
                                className={clsx('form-control')}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="form-label text-gray-900">Meta Description</label>
                        <label className="input">
                            <input
                                placeholder="Enter username"
                                className={clsx('form-control')}
                            />
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )
}


export { Attributes }