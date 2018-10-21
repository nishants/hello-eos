#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;

class mycontract : public contract {
	public:
		using contract::contract;

		[[eosio::action]]
		void myaction(name user){
		    require_auth( user );
			print("My contract was used to say hi to : ", name{user});
		}
};

EOSIO_DISPATCH(mycontract, (myaction))