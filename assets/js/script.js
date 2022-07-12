var myAccountAddress,contractInstance;
var network_From = 'eth';
var network_To = 'dith';
var asset_Name = 'eth';
var asset_To = 'dith';
var chainID = 4;
var global = {
	tronUserAddress : '',
	tronUserAddressHex : '',
	loggedIn : false
}
if(window.ethereum){
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile && window.ethereum.isMetaMask==true){
            var myweb3 = new Web3("https://mainnet.infura.io/v3/API_KEY");
     }else{
         const oldProvider = web3.currentProvider; // keep a reference to metamask provider
         var myweb3 = new Web3(oldProvider);
     }
     
     ethereum.on('accountsChanged', handleAccountsChanged);
     function handleAccountsChanged (accounts) {
       if (accounts.length === 0) {    
         // MetaMask is locked or the user has not connected any accounts
         console.log('Please connect to MetaMask.')
       } else if (accounts[0] !== myAccountAddress) {
           window.location.href = "";
       }
    }
}else{
        var myweb3 = new Web3( Web3.givenProvider || "https://mainnet.infura.io/v3/API_KEY");
        const oldProvider = myweb3.currentProvider; // keep a reference to metamask provider
        var myweb3 = new Web3(oldProvider);
}

async function checkAccount() {
    if (window.ethereum) {
        myweb3.eth.getAccounts((err, accounts) => {
    
            if (accounts == null || accounts.length == 0) {
                console.log("NO ACCOUNT CONNECTED");
            } else {
                if (myAccountAddress != accounts[0]) {
                    myAccountAddress = accounts[0];                    
                }
                const shortAddress = getUserAddress(myAccountAddress);
                $('#connectWallet,#connectWallet1').html(shortAddress);
                $('#connectWallet,#connectWallet1').attr("href", "https://etherscan.io/address/"+myAccountAddress).attr('target','_blank');
                $('#connectWallet1').hide();
                $('#btnNext').show();
            }
        });
        
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile && window.ethereum.isMetaMask==true){
                     const accounts_ = await window.ethereum.request({ method: 'eth_requestAccounts' });
                     if (accounts_ == null || accounts_.length == 0) {
                        console.log("NO ACCOUNT CONNECTED");
                    } else {
                        if (myAccountAddress != accounts_[0]) {
                            myAccountAddress = accounts_[0];                    
                        }
                        const shortAddress = getUserAddress(myAccountAddress);
                        $('#connectWallet,#connectWallet1').html(shortAddress);
                        $('#connectWallet,#connectWallet1').attr("href", "https://etherscan.io/address/"+myAccountAddress).attr('target','_blank');
                        $('#connectWallet1').hide();
                        $('#btnNext').show();
                    }
        } 
    }
}
setTimeout(checkAccount, 500);
$('document').ready(function(){
    addNetowrk('ETH');
});
//get short user address
function getUserAddress(userAddress){
    firstFive   = userAddress.substring(0 , 5); 
    lastFive    = userAddress.substr(userAddress.length - 5);
    return firstFive+'...'+lastFive;
}

function number_to_2decimals(str)
{
    str = str.toString();
    const decimalPointIndex = str.indexOf(".");
    if (decimalPointIndex === -1) return str + ".00";
    return (str+"00").substr(0, decimalPointIndex+3);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//connect to metamask wallet 
$("#connectWallet,#connectWallet1").click(async function(e){
    e.preventDefault();
    var accounts_;
    if(window.ethereum){
        window.ethereum.enable();
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile && window.ethereum.isMetaMask==true){
                accounts_ = await window.ethereum.request({ method: 'eth_requestAccounts' });
                //alert(accounts_);
            
        }else{
            accounts_ = await ethereum.request({ method: 'eth_accounts' });
              console.log(accounts_);
        }
        //const accounts_ = await ethereum.request({ method: 'eth_accounts' });
        if(accounts_!=""){
            window.location.href = "";
        }
    }
});

//token select 
$('#assetFrom li').click(function(){
    var name = $(this).data('name');
    
    if(name=="dith"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/eth-icon.svg"> ETH (Dithereum Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/eth-icon.svg"> ETH (Ethereum Network)');
        $('.tokenCheck').hide();
        $('#dithTokencheck').show();
        asset_Name = 'dith';
        asset_To = 'eth';
        network_From = 'dith';
        network_To = 'eth';
        addNetowrk('DITH');
        $('#receiveTokenImg').attr('src','assets/img/eth-icon.svg');
        $('#reciveName').html('ETH');
        $('#feeText').html('(Fee 10$ of ETH)');
        $('#feeText').show();
    }
    if(name=="eth"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/eth-icon.svg"> ETH (Ethereum Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/eth-icon.svg"> ETH (Dithereum Network)');
        $('.tokenCheck').hide();
        $('#ethTokencheck').show();
        asset_Name = 'eth';
        asset_To = 'dith';
        network_From = 'eth';
        network_To ='dith';
        addNetowrk('ETH');
        $('#receiveTokenImg').attr('src','assets/img/eth-icon.svg');
        $('#reciveName').html('ETH');
        $('#feeText').hide();
    }
    if(name=="bnb"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/bnb-logo.png"> BNB (Binance Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/bnb-logo.png"> BNB (Dithereum Network)');
        asset_Name = 'bnb';
        asset_To = 'dith';
        network_From = 'bsc';
        network_To = 'dith';
        $('.tokenCheck').hide();
        $('#bscTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/bnb-logo.png');
        $('#reciveName').html('BNB');
        $('#feeText').hide();
        addNetowrk('BNB');
    }
    if(name=="dbnb"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/bnb-logo.png"> BNB (Dithereum Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/bnb-logo.png"> BNB (Binance Network)');
        asset_Name = 'dbnb';
        asset_To = 'bnb';
        network_From = 'dith';
        network_To = 'bsc';
        $('.tokenCheck').hide();
        $('#dbscTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/bnb-logo.png');
        $('#reciveName').html('BNB');
        $('#feeText').hide();
        //addNetowrk('DITH');
        addNetowrk('DITH');
    }
    if(name=="trx"){
        
        $('#assetFromUL').html('<img class="icons" src="assets/img/tron-logo.png"> TRX (TRON Network)');
        $('#assetTo li').addClass("disabled2");
        $('#assetToUl').html('<img class="icons" src="assets/img/tron-logo.png"> TRX (Dithereum Network)');
        asset_Name = 'trx';
        asset_To = 'dith';
        network_From = 'trx';
        network_To = 'dith';
        $('.tokenCheck').hide();
        $('#trxTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tron-logo.png');
        $('#reciveName').html('TRX');
        $('#feeText').hide();
        addNetowrk('TRX');
    }
    if(name=="dtrx"){
        
        $('#assetFromUL').html('<img class="icons" src="assets/img/tron-logo.png"> TRX (Dithereum Network)');
        $('#assetTo li').addClass("disabled2");
        $('#assetToUl').html('<img class="icons" src="assets/img/tron-logo.png"> TRX (TRON Network)');
        asset_Name = 'dtrx';
        asset_To = 'trx';
        network_From = 'dith';
        network_To = 'trx';
        $('.tokenCheck').hide();
        $('#dtrxTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tron-logo.png');
        $('#reciveName').html('TRX');
        $('#feeText').hide();
        addNetowrk('TRX');
    }
    if(name=="matic"){
        asset_Name = 'matic';
        asset_To = 'dmatic';
        network_From = 'polygon';
        network_To = 'dith';
        $('#assetFromUL').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> MATIC (Polygon Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> MATIC (Dithereum Network)');
        $('.tokenCheck').hide();
        $('#maticTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('MATIC');
        $('#feeText').hide();
        addNetowrk('POLYGON');
    }
    if(name=="dmatic"){
        asset_Name = 'dmatic';
        asset_To = 'matic';
        network_From = 'dith';
        network_To = 'polygon';
        $('#assetFromUL').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> MATIC (Dithereum Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> MATIC (Polygon Network)');
        $('.tokenCheck').hide();
        $('#dmaticTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('MATIC');
        $('#feeText').hide();
        addNetowrk('DITH');
    }
    if(name=="ht"){
        asset_Name = 'ht';
        asset_To = 'dith';
        network_From = 'heco';
        network_To = 'dith';
        $('#assetFromUL').html('<img class="icons" src="assets/img/heco-logo.png"> HT (Heco Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/heco-logo.png"> HT (Dithereum Network)');
        $('.tokenCheck').hide();
        $('#hecoTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/heco-logo.png');
        $('#reciveName').html('HT');
        $('#feeText').hide();
        addNetowrk('HECO');;
    }
    if(name=="dht"){
        asset_Name = 'dht';
        asset_To = 'ht';
        network_From = 'dith';
        network_To = 'heco'
        $('#assetFromUL').html('<img class="icons" src="assets/img/heco-logo.png"> HT (Dithereum Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/heco-logo.png"> HT (Heco Network)');
        $('.tokenCheck').hide();
        $('#dhecoTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/heco-logo.png');
        $('#reciveName').html('HT');
        $('#feeText').hide();
        addNetowrk('DITH');;
    }
    if(name=="dusd"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> DUSD (Dithereum Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> USDT (Binance Network)');
        asset_Name = 'dusd';
        asset_To = 'busd';
        network_From = 'dith';
        network_To = 'bsc';
        $('.tokenCheck').hide();
        $('#dusdTokencheck').show();
        addNetowrk('DITH');
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('USDT');
        //$('#feeText').html('(Fee 10 USDT)');
        $('#feeText').hide();
    }
    if(name=="usdt"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> USDT (Ethereum Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> DUSD (Dithereum Network)');
        asset_Name = 'usdt';
        asset_To = 'dusd';
        network_From = 'eth';
        network_To = 'dith';
        $('.tokenCheck').hide();
        $('#usdtTokencheck').show();
        addNetowrk('ETH');
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('DUSD');
        $('#feeText').hide();
    }
    if(name=="usdtbsc"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> USDT (Binance Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> DUSD (Dithereum Network)');
        asset_Name = 'usdtbsc';
        network_From = 'bsc';
        network_To = 'dith';
        asset_To = 'dusd';
        $('.tokenCheck').hide();
        $('#usdtbscTokencheck').show();
        addNetowrk('BNB');
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('DUSD');
        $('#feeText').hide();
    }
    if(name=="usdc"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/usdc-logo.png"> USDC (Ethereum Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> DUSD (Dithereum Network)');
        asset_Name = 'usdc';
        asset_To = 'dusd';
        network_From = 'eth';
        network_To = 'dith';
        $('.tokenCheck').hide();
        $('#usdcTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('DUSD');
        $('#feeText').hide();
        addNetowrk('ETH');
    }
    if(name=="busd"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/busd-logo.png"> BUSD (Binance Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> DUSD (Dithereum Network)');
        asset_Name = 'busd';
        network_From = 'bsc';
        asset_To = 'dusd';
        network_To = 'dith';
        $('.tokenCheck').hide();
        $('#busdTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('DUSD');
        $('#feeText').hide();
        addNetowrk('BNB');
    }
    if(name=="dai"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/dai-logo.png"> DAI (Ethereum Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> DUSD (Dithereum Network)');
        $('.tokenCheck').hide();
        asset_Name = 'dai';
        network_From = 'eth';
        asset_To = 'dusd';
        network_To = 'dith';
        $('#daiTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('DUSD');
        $('#feeText').hide();
        addNetowrk('ETH');
    }
    if(name=="pax"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/pax-logo.png"> PAX (Ethereum Netowoek)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> DUSD (Dithereum Network)');
        asset_Name = 'pax';
        asset_To = 'dusd';
        network_From = 'eth';
        network_To = 'dith';
        $('.tokenCheck').hide();
        $('#paxTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('DUSD');
        $('#feeText').hide();
        addNetowrk('ETH');
    }
});
//add networks Dithereum
async function addNetowrk(network){
    //Dithereum Network
    if(network=='DITH'){
        if(window.ethereum) {
            try {
                await ethereum.request({
                method: 'wallet_switchEthereumChain',
                //params: [{ chainId: '0x1' }],
                params: [{ chainId: '0x22' }], // mainnet =  params: [{ chainId: '0x18' }], // mainnet 0x18 , testnet = 0x22
                });
		   chainID = 34; // testnet = 34 mainnet = 24
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    //params: [{ chainId: '0x18', rpcUrl: 'https://node-mainnet.dithereum.io/' /* ... */ }], // mainnet 
                     params: [{ chainId: '0x18', rpcUrl: 'https://node-testnet.dithereum.io/' /* ... */ }], // mainnet 
                    });
                    chainID = 34; // testnet = 34 mainnet = 24
                } catch (addError) {
                    // handle "add" error
                }
                }
                // handle other "switch" errors
            }
        }

    }
    //Ethereum Network
    if(network=='ETH'){
        if(window.ethereum) {
            try {
                await ethereum.request({
                method: 'wallet_switchEthereumChain',
                //params: [{ chainId: '0x1' }],
                params: [{ chainId: '0x1' }],
                });
		    chainID = 1;
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{ chainId: '0x1', rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161' /* ... */ }],
                   //params: [{ chainId: '0x1', rpcUrl: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161' /* ... */ }],
                    });
                    chainID = 1;
                } catch (addError) {
                    // handle "add" error
                }
                }
                // handle other "switch" errors
            }
        }

    }
    //TRX Network
    if(network=='TRX'){
        if (window.tronWeb && window.tronWeb.ready){
                global.tronUserAddress = await window.tronWeb.defaultAddress.base58;
                global.tronUserAddressHex = await window.tronWeb.defaultAddress.hex;
                global.loggedIn = true;
                showAccountInfo();
        }else{
            alertify.alert('Warning !','Please Login to Tronlink');
        }
    }
    //SOL Network
    if(network=='SOL'){
        if(window.ethereum) {
            window.web3 = new  Web3(window.ethereum)
            window.ethereum.request({method: 'eth_requestAccounts'})
            window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{chainId: '0xa869',
                    chainName: "SOLANA Network",
                    nativeCurrency: {
                    name: "Solana",
                    symbol: "SOL",
                    decimals: 18
                    },
                    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],     blockExplorerUrls: ['https://cchain.explorer.avax-test.network/']
                }]
            })
        }
    }
    //BNB Network
    if(network=='BNB'){
        if(window.ethereum) {
            window.web3 = new  Web3(window.ethereum)
            window.ethereum.request({method: 'eth_requestAccounts'})
            window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{chainId: '0x38', //testnet '0x61',
                    chainName: "BSC Mainnet",
                    nativeCurrency: {
                    name: "Binance Chain",
                    symbol: "BNB",
                    decimals: 18
                    },
                    rpcUrls: ['https://bsc-dataseed1.defibit.io/'],     blockExplorerUrls: ['https://bscscan.com/']
                    //rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'], blockExplorerUrls: ['https://testnet.bscscan.com']
                }]
            })
            chainID = 56;
            checkAccount();
        }
    }
    //Polygon Network
    if(network=='POLYGON'){
        if(window.ethereum) {
            window.web3 = new  Web3(window.ethereum)
            window.ethereum.request({method: 'eth_requestAccounts'})
            window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{chainId: '0x89',
                    chainName: "Polygon Network",
                    nativeCurrency: {
                    name: "Polygon",
                    symbol: "MATIC",
                    decimals: 18
                    },
                    rpcUrls: ['https://polygon-rpc.com'],     blockExplorerUrls: ['https://polygonscan.com/']
                }]
            })
            chainID = 137;
            checkAccount();
        }
    }
    //Heco Network
    if(network=='HECO'){
        if(window.ethereum) {
            window.web3 = new  Web3(window.ethereum)
            window.ethereum.request({method: 'eth_requestAccounts'})
            window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{chainId: '0x80', //testnet '0x100', 
                    chainName: "Heco-Mainnet",
                    nativeCurrency: {
                    name: "Heco",
                    symbol: "HT",
                    decimals: 18
                    },
                    rpcUrls: ['https://http-mainnet-node.huobichain.com'],     blockExplorerUrls: ['https://hecoinfo.com']
                    //rpcUrls: ['https://http-testnet.hecochain.com'],     blockExplorerUrls: ['https://testnet.hecoinfo.com/']
                }]
            })
            chainID = 128;
            checkAccount();
        }
    }

}
//token amount key press event 
$('#tokenAmount').on('keyup keydown change', function(e){
    if($(this).val() < 0 ){
        $(this).val(1);
    }else{
        $('#reciveToken').html($(this).val());
    } 

});

//function for tx alert etc
function processTx(data,contractAddress,web3GasPrice,gasLimit,value,TX_URL){
        myweb3.eth.sendTransaction({
            from: myAccountAddress,
            to: contractAddress,
            //gasPrice: localStorage.getItem('ethGasPrice'),
            gasPrice : web3GasPrice,
            gasLimit: gasLimit,
            data: data, // deploying a contracrt
            value : value,
            }).on('transactionHash',function(hash){
                alertify.alert("Transaction Recorded","Please wait upto 5 min for your coins to reflect.<br>" +
                                                    "Please check the status of transaction <a href='"+TX_URL+hash+"' target='_blank'> Here</a>", function(){});
            }).on('receipt', function(receipt){
                alertify.alert('Transaction Success', 'Your transaction is confirmed successfully.<br>'+
                                                       'Dithereum Bridge will send you the coins soon.<br>'+
                                                       'You can check transaction details into History page.<br>'+
                                                       'If you have any questions, please reach out to Dithereum Bridge Support', function(){});  
            }).on('error',function(error){
                var ErrorMsg=error.message;
                alertify.alert('Error', ""+ErrorMsg, function(){});
            });
}

//coinIn code 

function logEtoLongNumber(amountInLogE){
    
    amountInLogE = amountInLogE.toString();
    var noDecimalDigits = "";
  
    if(amountInLogE.includes("e-")){
      
      var splitString = amountInLogE.split("e-"); //split the string from 'e-'
  
      noDecimalDigits = splitString[0].replace(".", ""); //remove decimal point
  
      //how far decimals to move
      var zeroString = "";
      for(var i=1; i < splitString[1]; i++){
        zeroString += "0";
      }
  
      return  "0."+zeroString+noDecimalDigits;
      
    }
    else if(amountInLogE.includes("e+")){
  
      var splitString = amountInLogE.split("e+"); //split the string from 'e+'
      var ePower = parseInt(splitString[1]);
  
      noDecimalDigits = splitString[0].replace(".", ""); //remove decimal point
  
      if(ePower >= noDecimalDigits.length-1){
        var zerosToAdd = ePower  - noDecimalDigits.length;
  
        for(var i=0; i <= zerosToAdd; i++){
          noDecimalDigits += "0";
        }
  
      }
      else{
        //this condition will run if the e+n is less than numbers
        var stringFirstHalf = noDecimalDigits.slice(0, ePower+1);
        var stringSecondHalf = noDecimalDigits.slice(ePower+1);
  
        return stringFirstHalf+"."+stringSecondHalf;
      }
      return noDecimalDigits;
    }
    return amountInLogE;  //by default it returns stringify value of original number if its not logarithm number
  }

$('#btnNext').click(async function(){
    var confirmMessage = '';
    var tokenAmount = $('#tokenAmount').val();
    var tAmount = tokenAmount;
    //var approveAmount = '1000000000000000000000000000000';
    var approveAmount = logEtoLongNumber(1000000000000000000000000000000000);
        if(tokenAmount==0 || tokenAmount=="" || tokenAmount<0){
            alertify.alert("Warning","Please enter Amount.");
            return false;
        }
    if(network_From=='eth'){
        if(asset_Name=='eth'){
            if(tokenAmount<0.0025){
                alertify.alert("Warning","Minimum Amount is 0.0025");
                return false;
            }   
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' ETH (Ethereum Network) to ' +  tokenAmount +' ETH (Dithereum Network)';
        }
        if(asset_Name=='usdt'){
            if(tokenAmount<10){
                alertify.alert("Warning","Minimum Amount is 10");
                return false;
            } 
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' USDT (Ethereum Network) to ' +  tokenAmount +' DUSD (Dithereum Network)';
        }
        if(asset_Name=='usdc'){
            if(tokenAmount<10){
                alertify.alert("Warning","Minimum Amount is 10");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' USDC (Ethereum Network) to ' +  tokenAmount +' DUSD (Dithereum Network)';
        }
        if(asset_Name=='dai'){
            if(tokenAmount<10){
                alertify.alert("Warning","Minimum Amount is 10");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' DAI (Ethereum Network) to ' +  tokenAmount +' DUSD (Dithereum Network)';
        }
        if(asset_Name=='pax'){
            if(tokenAmount<10){
                alertify.alert("Warning","Minimum Amount is 10");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' PAX (Ethereum Network) to ' +  tokenAmount +' DUSD (Dithereum Network)';
        }

    }
    if(network_From=='dith'){
        if(asset_Name=='dith'){
            if(tokenAmount<0.0025){
                alertify.alert("Warning","Minimum Amount is 0.0025");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' ETH (Dithereum Network) to ' +  tokenAmount +' ETH (Ethereum Network)';
        }
        if(asset_Name=='dbnb'){
            if(tokenAmount<0.02){
                alertify.alert("Warning","Minimum Amount is 0.02");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' BNB (Dithereum Network) to ' +  tokenAmount +' BNB (Binance Network)';
        }
        if(asset_Name=='dmatic'){
            if(tokenAmount<10){
                alertify.alert("Warning","Minimum Amount is 10");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' MATIC (Dithereum Network) to ' +  tokenAmount +' MATIC (Polygon Network)';
        }
        if(asset_Name=='dht'){
            if(tokenAmount<1){
                alertify.alert("Warning","Minimum Amount is 1");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' HT (Dithereum Network) to ' +  tokenAmount +' HT (Heco Network)';
        }
        if(asset_Name=='dusd'){
            if(tokenAmount<10){
                alertify.alert("Warning","Minimum Amount is 10");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' DUSD (Dithereum Network) to ' +  tokenAmount +' USDT (Binance Network)';
        }
        if(asset_Name=='dtrx'){
            if(tokenAmount<10){
                alertify.alert("Warning","Minimum Amount is 10");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' TRX (Dithereum Network) to ' +  tokenAmount +' TRX (TRON Network)';
        }
        
    }
    
    if(network_From=='bsc'){
        if(asset_Name=='bnb'){
            if(tokenAmount<0.02){
                alertify.alert("Warning","Minimum Amount is 0.02");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' BNB (Binance Network) to ' +  tokenAmount +' BNB (Dithereum Network)';
        }
        if(asset_Name=='usdtbsc'){
            if(tokenAmount<10){
                alertify.alert("Warning","Minimum Amount is 10");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' USDT (Binance Network) to ' +  tokenAmount +' DUSD (Dithereum Network)';
        }
        if(asset_Name=='busd'){
            if(tokenAmount<10){
                alertify.alert("Warning","Minimum Amount is 10");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' BUSD (Binance Network) to ' +  tokenAmount +' DUSD (Dithereum Network)';
        }
    }
    if(network_From=='polygon'){
        if(asset_Name=='matic'){
            if(tokenAmount<10){
                alertify.alert("Warning","Minimum Amount is 10");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' MATIC (Polygon Network) to ' +  tokenAmount +' MATIC (Dithereum Network)';
        }
    }
    if(network_From=='heco'){
        if(asset_Name=='ht'){
            if(tokenAmount<1){
                alertify.alert("Warning","Minimum Amount is 1");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' HT (Heco Network) to ' +  tokenAmount +' HT (Dithereum Network)';
        }
    }
    if(network_From=='trx'){
        if(asset_Name=='trx'){
            if(tokenAmount<10){
                alertify.alert("Warning","Minimum Amount is 10");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' TRX (TRON Network) to ' +  tokenAmount +' TRX (Dithereum Network)';
        }
    }

    alertify.confirm('Confirm Transaction', confirmMessage, async function(){
        tokenAmount = tokenAmount*1e18;
       //tokenAmount = ""+tokenAmount;
    //eth network
    if(network_From=='eth'){
        ethContractInstance = new myweb3.eth.Contract(ethereumABI, ethereumContract, {
            from: myAccountAddress, // default from address
        });
        
        
        var gasLimit = 200000;
        const web3GasPrice = await myweb3.eth.getGasPrice();
        if(asset_Name=='eth'){
              var data = ethContractInstance.methods.coinIn().encodeABI();
              processTx(data,ethereumContract,web3GasPrice,gasLimit,tokenAmount,ETHERSCAN_URL);
        }
        if(asset_Name=='usdt' || asset_Name=='usdc' || asset_Name=='dai' || asset_Name=='pax'){          
            
            if(asset_Name=='usdt'){    
                usdtContractInstance =  new myweb3.eth.Contract(usdtEthABI, usdtEthAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,ethereumContract).call();
               
                if(allowance<tAmount){
                    var result = usdtContractInstance.methods.approve(ethereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: usdtEthAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });

                    var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
                }
            }
            if(asset_Name=='usdc'){
                assetContract = usdcAddress;
                usdcContractInstance =  new myweb3.eth.Contract(usdcABI, usdcAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdcContractInstance.methods.allowance(myAccountAddress,ethereumContract).call();
                if(allowance<tAmount){
                    var result = usdcContractInstance.methods.approve(ethereumContract,tokenAmount).send({
                        from: myAccountAddress,
                        to: usdcAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });

                    var data = ethContractInstance.methods.tokenIn(usdcAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);                  
                }else{
                    var data = ethContractInstance.methods.tokenIn(usdcAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
                }
            }
            if(asset_Name=='dai'){
                assetContract = daiAddress;
                daiContractInstance =  new myweb3.eth.Contract(daiABI, daiAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await daiContractInstance.methods.allowance(myAccountAddress,ethereumContract).call();
                if(allowance<tAmount){
                    var result =  daiContractInstance.methods.approve(ethereumContract,tokenAmount).send({
                        from: myAccountAddress,
                        to: daiAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });

                    var data = ethContractInstance.methods.tokenIn(daiAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
                }else{
                    var data = ethContractInstance.methods.tokenIn(daiAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
                }
            }
            if(asset_Name=='pax'){
                assetContract = paxAddress;
                paxContractInstance =  new myweb3.eth.Contract(usdcABI, paxAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await paxContractInstance.methods.allowance(myAccountAddress,ethereumContract).call();
                if(allowance<tAmount){
                    var result = paxContractInstance.methods.approve(ethereumContract,tokenAmount).send({
                        from: myAccountAddress,
                        to: paxAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
                    var data = ethContractInstance.methods.tokenIn(paxAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
                }else{
                    var data = ethContractInstance.methods.tokenIn(paxAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
                }
            }
               
        }
    }
   
    //dith network
    if(network_From=='dith'){
        ethContractInstance = new myweb3.eth.Contract(dithereumABI, dithereumContract, {
            from: myAccountAddress, // default from address
        });
       
        var gasLimit = 200000;
        const web3GasPrice = await myweb3.eth.getGasPrice();
        if(asset_To=='eth'){
            usdtContractInstance =  new myweb3.eth.Contract(ethDthABI, ethDthAddress, {
                from: myAccountAddress, // default from address
            });
            const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
           
            if(allowance<tAmount){
                var result = usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                    from: myAccountAddress,
                    to: ethDthAddress,
                    gasPrice: web3GasPrice,
                    gasLimit: gasLimit,
                    value : 0,       
                });

                var data = ethContractInstance.methods.tokenIn(ethDthAddress,tokenAmount,chainID).encodeABI();
                processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
               
            }else{
                var data = ethContractInstance.methods.tokenIn(ethDthAddress,tokenAmount,chainID).encodeABI();
                processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
            }
            //var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
            //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL); 
        }
        if(asset_To=='usdt' || asset_To=='usdc' || asset_To=='dai' || asset_To=='pax'){          
            
            if(asset_To=='usdt'){ 
                usdtContractInstance =  new myweb3.eth.Contract(usdtEthABI, usdtEthAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result = usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: usdtEthAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
    
                    var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                }

                //var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
                //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL); 
            }
            if(asset_To=='usdc'){
                usdcContractInstance =  new myweb3.eth.Contract(usdcABI, usdcAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdcContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result = usdcContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: usdcAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
    
                    var data = ethContractInstance.methods.tokenIn(usdcAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(usdcAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                }

                //var data = ethContractInstance.methods.tokenIn(usdcAddress,tokenAmount,chainID).encodeABI();
                //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
            }
            
            if(asset_To=='dai'){
                daiContractInstance =  new myweb3.eth.Contract(daiABI, daiAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await daiContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result = daiContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: daiAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
    
                    var data = ethContractInstance.methods.tokenIn(daiAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(daiAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                }

                //var data = ethContractInstance.methods.tokenIn(daiAddress,tokenAmount,chainID).encodeABI();
                //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
            }
            if(asset_To=='pax'){
                paxContractInstance =  new myweb3.eth.Contract(paxABI, paxAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await paxContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result = paxContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: paxAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
    
                    var data = ethContractInstance.methods.tokenIn(paxAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(paxAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                }

                //var data = ethContractInstance.methods.tokenIn(paxAddress,tokenAmount,chainID).encodeABI();
                //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
            }
        }

            if(asset_To=='bnb'){
                bscContractInstance = new myweb3.eth.Contract(bscABI, bscContract, {
                    from: myAccountAddress, // default from address
                });
                
                var gasLimit = 200000;
                const web3GasPrice = await myweb3.eth.getGasPrice();
                usdtContractInstance =  new myweb3.eth.Contract(bnbDthABI, bnbDthAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result = usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: bnbDthAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
    
                    var data = ethContractInstance.methods.tokenIn(bnbDthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(bnbDthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                }

                //var data = bscContractInstance.methods.tokenIn(usdtBscAddress,tokenAmount,chainID).encodeABI();
                //processTx(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);
            }
    
            if(asset_To=='usdtbsc'){
                bscContractInstance = new myweb3.eth.Contract(bscABI, bscContract, {
                    from: myAccountAddress, // default from address
                });
               
                var gasLimit = 200000;
                const web3GasPrice = await myweb3.eth.getGasPrice();
                usdtContractInstance =  new myweb3.eth.Contract(usdtBscABI, usdtBscAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result = usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: usdtBscAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
    
                    var data = ethContractInstance.methods.tokenIn(usdtBscAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(usdtBscAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                }

                //var data = bscContractInstance.methods.tokenIn(usdtBscAddress,tokenAmount,chainID).encodeABI();
                //processTx(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);
                    
            }
            if(asset_To=='busd'){
                // bscContractInstance = new myweb3.eth.Contract(bscABI, bscContract, {
                //     from: myAccountAddress, // default from address
                // });
                
               
                var gasLimit = 200000;
                const web3GasPrice = await myweb3.eth.getGasPrice();
                usdtContractInstance =  new myweb3.eth.Contract(dusddDthABI, dusdDthAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result = usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: dusdDthAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
    
                    var data = ethContractInstance.methods.tokenIn(dusdDthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(dusdDthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                }

                //var data = bscContractInstance.methods.tokenIn(busdBscAddress,tokenAmount,chainID).encodeABI();
                //processTx(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);
            }  

            if(network_To=='polygon'){
                polygonContractInstance = new myweb3.eth.Contract(polygonABI, polygonContract, {
                    from: myAccountAddress, // default from address
                });
                
                if(asset_To=='matic'){
                   
                    var gasLimit = 200000;
                    const web3GasPrice = await myweb3.eth.getGasPrice();
                    //var data = polygonContractInstance.methods.coinIn().encodeABI();
                    usdtContractInstance =  new myweb3.eth.Contract(maticdDthABI, maticDthAddress, {
                        from: myAccountAddress, // default from address
                    });
                    const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
                   
                    if(allowance<tAmount){
                        var result = usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                            from: myAccountAddress,
                            to: maticDthAddress,
                            gasPrice: web3GasPrice,
                            gasLimit: gasLimit,
                            value : 0,       
                        });
        
                        var data = ethContractInstance.methods.tokenIn(maticDthAddress,tokenAmount,chainID).encodeABI();
                        processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                       
                    }else{
                        var data = ethContractInstance.methods.tokenIn(maticDthAddress,tokenAmount,chainID).encodeABI();
                        processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                    }

                    //var data = polygonContractInstance.methods.tokenIn(polygonContract,tokenAmount,chainID).encodeABI();
                    //processTx(data,polygonContract,web3GasPrice,gasLimit,0,POLYSCAN_URL);
                }
            }

            if(network_To=='heco'){
                hecoContractInstance = new myweb3.eth.Contract(hecoABI, hecoContract, {
                    from: myAccountAddress, // default from address
                });
                
                if(asset_To='ht'){
                    var gasLimit = 200000;
                    const web3GasPrice = await myweb3.eth.getGasPrice();
                   // var data = hecoContractInstance.methods.coinIn().encodeABI();
                   usdtContractInstance =  new myweb3.eth.Contract(htDthABI, htDthAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result = usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: htDthAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
    
                    var data = ethContractInstance.methods.tokenIn(htDthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(htDthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,DITHERSCAN_URL);
                }

                 //  var data = hecoContractInstance.methods.tokenIn(hecoContract,tokenAmount,chainID).encodeABI();
                  //  processTx(data,hecoContract,web3GasPrice,gasLimit,0,HECOSCAN_URL);
                }
            }
            if(network_To=='trx'){
                if(asset_To=='trx'){
                    let result = await tronContractInstance.coinIn().send({
                        feeLimit: 50000000,
                        callValue: tokenAmount,
                        from: global.userAddress
                    });
                        alertify.alert('Success','Please wait upto 5 min for your coins to reflect.<br>' +
                        'You can check transaction here, ' +
                        '<a target="_blank" href="'+TRONSCAN_URL+result+'"><b>click here</b></a>');
                }
            }
    }
    //bsc network
    if(network_From=='bsc'){
        bscContractInstance = new myweb3.eth.Contract(bscABI, bscContract, {
            from: myAccountAddress, // default from address
        });
        
       
        var gasLimit = 200000;
        const web3GasPrice = await myweb3.eth.getGasPrice();

        if(asset_Name=='bnb'){
            var data = bscContractInstance.methods.coinIn().encodeABI();
            processTx(data,bscContract,web3GasPrice,gasLimit,tokenAmount,BSCSCAN_URL);
        }

        if(asset_Name=='usdtbsc'){
            var usdtbscContractInstance =  new myweb3.eth.Contract(usdtBscABI, usdtBscAddress, {
                from: myAccountAddress, // default from address
            });
            const allowance = await usdtbscContractInstance.methods.allowance(myAccountAddress,bscContract).call();
            if(allowance<tAmount){
                var result = usdtbscContractInstance.methods.approve(bscContract,tokenAmount).send({
                    from: myAccountAddress,
                    to: usdtBscAddress,
                    gasPrice: web3GasPrice,
                    gasLimit: gasLimit,
                    value : 0,       
                });
                var data = bscContractInstance.methods.tokenIn(usdtBscAddress,tokenAmount,chainID).encodeABI();
                processTx(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);     
            }else{
                var data = bscContractInstance.methods.tokenIn(usdtBscAddress,tokenAmount,chainID).encodeABI();
                processTx(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);     
            }            
        }
        if(asset_Name=='busd'){
            var busdbscContractInstance =  new myweb3.eth.Contract(busdBscABI, busdBscAddress, {
                from: myAccountAddress, // default from address
            });
            const allowance = await busdbscContractInstance.methods.allowance(myAccountAddress,bscContract).call();
            if(allowance<tAmount){
                var result = busdbscContractInstance.methods.approve(bscContract,tokenAmount).send({
                    from: myAccountAddress,
                    to: busdBscAddress,
                    gasPrice: web3GasPrice,
                    gasLimit: gasLimit,
                    value : 0,       
                });
                var data = bscContractInstance.methods.tokenIn(busdBscAddress,tokenAmount,chainID).encodeABI();
                processTx(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);      
            }else{
                var data = bscContractInstance.methods.tokenIn(busdBscAddress,tokenAmount,chainID).encodeABI();
                processTx(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);   
            } 
            
        }
    }
    //polygon network
    if(network_From=='polygon'){
        polygonContractInstance = new myweb3.eth.Contract(polygonABI, polygonContract, {
            from: myAccountAddress, // default from address
        });
        
       
        var gasLimit = 200000;
        const web3GasPrice = await myweb3.eth.getGasPrice();
        var data = polygonContractInstance.methods.coinIn().encodeABI();
        processTx(data,polygonContract,web3GasPrice,gasLimit,tokenAmount,POLYSCAN_URL);            
    }
    //heco network
    if(network_From=='heco'){
        hecoContractInstance = new myweb3.eth.Contract(hecoABI, hecoContract, {
            from: myAccountAddress, // default from address
        });
       
       
        var gasLimit = 200000;
        const web3GasPrice = await myweb3.eth.getGasPrice();
        var data = hecoContractInstance.methods.coinIn().encodeABI();
        processTx(data,hecoContract,web3GasPrice,gasLimit,tokenAmount,HECOSCAN_URL);            
    }
    //trx network
    if(network_From=='trx'){
        var contractInfo = await tronWeb.trx.getContract(tronContract);
        tronContractInstance = await tronWeb.contract(contractInfo.abi.entrys,tronContract);
        //tronContractInstance = await tronWeb.contract(JSON.parse('{"entrys":[{"inputs":[{"indexed":true,"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"CoinIn","type":"Event"},{"inputs":[{"indexed":true,"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"CoinOut","type":"Event"},{"inputs":[{"indexed":true,"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"CoinOutFailed","type":"Event"},{"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"Event"},{"inputs":[{"indexed":true,"name":"tokenAddress","type":"address"},{"indexed":true,"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"TokenIn","type":"Event"},{"inputs":[{"indexed":true,"name":"tokenAddress","type":"address"},{"indexed":true,"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"TokenOut","type":"Event"},{"inputs":[{"indexed":true,"name":"tokenAddress","type":"address"},{"indexed":true,"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"TokenOutFailed","type":"Event"},{"name":"acceptOwnership","stateMutability":"Nonpayable","type":"Function"},{"inputs":[{"name":"_signer","type":"address"}],"name":"changeSigner","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"bool"}],"name":"coinIn","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"user","type":"address"},{"name":"amount","type":"uint256"}],"name":"coinOut","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"address"}],"name":"signer","stateMutability":"View","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokenAmount","type":"uint256"}],"name":"tokenIn","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"tokenAddress","type":"address"},{"name":"user","type":"address"},{"name":"tokenAmount","type":"uint256"}],"name":"tokenOut","stateMutability":"Nonpayable","type":"Function"},{"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","stateMutability":"Nonpayable","type":"Function"},{"stateMutability":"Payable","type":"Receive"}]}',tronContract));
        tokenAmount = $('#tokenAmount').val();
        tokenAmount = tokenAmount*1000000;
        if(asset_Name=='trx'){
            let result = await tronContractInstance.coinIn().send({
                feeLimit: 50000000,
                callValue: tokenAmount,
                from: global.userAddress
            });
            //if(result){
                alertify.alert('Success','Please wait upto 5 min for your coins to reflect.<br>' +
                'You can check transaction here, ' +
                '<a target="_blank" href="'+TRONSCAN_URL+result+'"><b>click here</b></a>');
            
          //  }else{
           //     alertify.alert("Fail","Transaction Fail, Please Try again.");
         //   }
        }
        if(asset_To=='usdt'){
                    let result = await tronContractInstance.tokenIn(usdtTronAddress,tokenAmount).send({
                        feeLimit: 5000000,
                        callValue: 0,
                        from: global.userAddress
                    });
                  //  if(result){
                        alertify.alert('Success','Please wait upto 5 min for your coins to reflect.<br>' +
					                'You can check transaction here, ' +
                                    '<a target="_blank" href="'+ETHERSCAN_URL+result.transactionHash+'"><b>click here</b></a>');
                    
                   // }else{
                  //      alertify.alert("Fail","Transaction Fail, Please Try again.");
                  //  }
                
        }
    }
}, function(){ });
})

// TRON CODE
let intervalID = setInterval(async function() {
    if (typeof window.tronWeb == "object") {
    	window.tronWeb.on("addressChanged", showAccountInfo);
        var userAddress = await window.tronWeb.defaultAddress.base58;
        var userAddressHex = await window.tronWeb.defaultAddress.hex;    
        
        if(global.tronUserAddress=='' && userAddress!=''){
            global.tronUserAddress =  userAddress;
            global.tronUserAddressHex =  userAddressHex;               	
        }
        if(global.tronUserAddress!='' && global.tronUserAddress!=userAddress){
            global.tronUserAddress =  userAddress;
            global.tronUserAddressHex =  userAddressHex;    
            location.reload();
        }
    }
    	
}, 1000);

function showAccountInfo(){    
        const shortAddress = getUserAddress(global.tronUserAddress);
        $('#connectWallet,#connectWallet1').html(shortAddress);
        $('#connectWallet,#connectWallet1').attr("href", "https://tronscan.org/#/address/"+global.tronUserAddress).attr('target','_blank');
        $('#connectWallet1').hide();
        $('#btnNext').show();
}
