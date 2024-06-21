<?php

namespace App\Services;

use RicorocksDigitalAgency\Soap\Facades\Soap;

class UltraImportService
{

    protected $client;
    protected $wsdl;
    protected $username;
    protected $password;

    public function __construct()
    {
        $this->wsdl = 'https://web1c.it-ultra.com/b2b/ws/b2b.1cws?wsdl';
        $this->username = env('SOAP_USERNAME');
        $this->password = env('SOAP_PASS');
        $this->client = Soap::to($this->wsdl)
            ->withBasicAuth($this->username, $this->password);
    }

    public function requestData($service, $all = true, $additionalParameters = '', $compress = false)
    {
        $response = $this->client->call('requestData', [
            'Service' => $service,
            'all' => $all,
            'additionalParameters' => $additionalParameters,
            'compress' => $compress
        ]);


        return $response->response->return;
    }

    public function isReady($GUID)
    {
        $response = $this->client->call('isReady', ['ID' => $GUID]);

        return $response->response->return;
    }

    public function getDataByID($GUID)
    {
        $response = $this->client->call('getDataByID', ['ID' => $GUID]);
        return $this->prepareResponse($response->response);
    }

    public function commitReceivingData($service)
    {
        $response = $this->client->call('CommitReceivingData', ['Service' => $service]);
        return $response->response;
    }


    public function prepareResponse($response)
    {
        $xml = $response->return->data;
        $simple_xml = simplexml_load_string($xml);
        return $simple_xml;
    }


    public function waitForReady($GUID, $maxRetries = 10, $retryInterval = 10)
    {
        for ($i = 0; $i < $maxRetries; $i++) {
            $isReady = $this->isReady($GUID);

            if ($isReady === true) {
                return true;
            }

            echo "Service not ready, retrying in $retryInterval seconds...\n";
            sleep($retryInterval);
        }

        echo "Service did not become ready after $maxRetries attempts\n";
        return false;
    }


}
