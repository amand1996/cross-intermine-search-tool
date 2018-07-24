Repository.getInstance().updateBuyerAccountDetails(Prefs.getAuthToken(), selectedCustomer.getCustomerId(), quoteId, updateBuyerAccountDetails)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseWrapper<AccountDto>>() {
                    @Override
                    public void accept(
                            ResponseWrapper<AccountDto> accountDtoResponseWrapper)
                            throws Exception {
                        
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(Throwable throwable) throws Exception {
                        
                    }
                });