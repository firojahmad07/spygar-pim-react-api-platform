<?php
namespace App\Installer\Reader;

use League\Csv\Reader;

class CsvFileReader
{
    public function read(string $filePath, string $delimeter = ","):array
    {
        if (!file_exists($filePath)) {
            throw new \RuntimeException("File Not found : $filePath");
        }

        $csv = Reader::createFromPath($filePath, 'r');
        $csv->setHeaderOffset(0);
        $csv->setDelimiter($delimeter);
        
        // Convert CSV records to an array
        $records = [];
        foreach ($csv as $record) {
            $records[] = $record;
        }

        return $records;
    }
}