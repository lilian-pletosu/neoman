<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use RicorocksDigitalAgency\Soap\Facades\Soap;
use SimpleXMLElement;

class UltraImportService
{

    protected $wsdl = 'https://web1c.it-ultra.com/b2b/ws/b2b.1cws?wsdl';
    protected $client;
    protected $username;
    protected $password;

    public function __construct()
    {
        $this->username = env('SOAP_USERNAME');
        $this->password = env('SOAP_PASS');
        $this->client = Soap::to($this->wsdl)
            ->withBasicAuth($this->username, $this->password);
    }

    public function requestData($service, $all = true, $additionalParameters = '', $compress = false)
    {
        if (empty($service)) {
            throw new \InvalidArgumentException('Service parameter is required');
        }

        try {
            $response = $this->client->call('requestData', [
                'Service' => $service,
                'all' => (bool)$all,
                'additionalParameters' => (string)$additionalParameters,
                'compress' => (bool)$compress
            ]);

            if (!isset($response->response->return)) {
                throw new \RuntimeException('Invalid response format');
            }

            return $response->response->return;
        } catch (\Throwable $th) {
            Log::error('UltraImport requestData failed', [
                'service' => $service,
                'error' => $th->getMessage()
            ]);
            throw $th;
        }
    }

    public function getDataByID($GUID): SimpleXMLElement
    {
        try {
            Log::info('Fetching data by ID', ['GUID' => $GUID]);
            $response = $this->client->call('getDataByID', ['ID' => $GUID]);
            $xml = $this->prepareResponse($response->response);
            return $xml;
        } catch (\Throwable $th) {
            Log::error('Failed to get data by ID', [
                'GUID' => $GUID,
                'error' => $th->getMessage()
            ]);
            throw $th;
        }
    }

    public function prepareResponse($response)
    {
        $xml = $response->return->data;

        $simple_xml = simplexml_load_string($xml);
        return $simple_xml;
    }

    public function commitReceivingData($service)
    {
        $response = $this->client->call('CommitReceivingData', ['Service' => $service]);
        return $response->response;
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

    public function isReady($GUID)
    {
        $response = $this->client->call('isReady', ['ID' => $GUID]);

        return $response->response->return;
    }
}
