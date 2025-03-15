<?php

namespace App\Installer\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use App\Repository\Catalog\LocaleRepository;
use App\Repository\Catalog\CategoryRepository;
use App\Repository\Setting\ChannelRepository;
use App\Repository\Catalog\CurrencyRepository;
use Symfony\Component\HttpKernel\KernelInterface;
use App\Installer\Reader\CsvFileReader;

#[AsCommand(
    name: 'spygar:pim:install',
    description: 'Add a short description for your command',
)]
class SpygarPimInstallCommand extends Command
{
    CONST LOCALE_FIXTURE_DATA = '/src/Installer/fixtures/locales.csv';
    CONST CURRENCY_FIXTURE_DATA = '/src/Installer/fixtures/currencies.csv';
    CONST CATEGORY_FIXTURE_DATA = '/src/Installer/fixtures/categories.csv';
    CONST CHANNEL_FIXTURE_DATA = '/src/Installer/fixtures/channels.csv';
    public function __construct(
        private KernelInterface $kernel,
        private CsvFileReader $csvFileReader,
        private LocaleRepository $localeRepository,
        private CurrencyRepository $currencyRepository,
        private CategoryRepository $categoryRepository,
        private ChannelRepository $channelRepository
    )
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('cat', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        // $this->loadLocales();
        // $this->loadCurrencies();
        // $this->loadCategories();
        $this->loadChannels();

        $io = new SymfonyStyle($input, $output);

        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');

        return Command::SUCCESS;
    }

    public function loadLocales()
    {
        $records = $this->csvFileReader->read($this->kernel->getProjectDir() . self::LOCALE_FIXTURE_DATA);

        foreach($records as $record) {
            $this->localeRepository->saveData($record);
        }
    }

    public function loadCurrencies()
    {
        $records = $this->csvFileReader->read($this->kernel->getProjectDir() . self::CURRENCY_FIXTURE_DATA, ";");
        foreach($records as $record) {
            $this->currencyRepository->saveData($record);
        }
    }

    public function loadCategories()
    {
        $records = $this->csvFileReader->read($this->kernel->getProjectDir() . self::CATEGORY_FIXTURE_DATA, ";");
        foreach($records as $record) {
            $this->categoryRepository->saveData($record);
        }
    }
    public function loadChannels()
    {
        $records = $this->csvFileReader->read($this->kernel->getProjectDir() . self::CHANNEL_FIXTURE_DATA, ";");
        
        foreach($records as $record) {
            $this->channelRepository->saveData($record);
        }
    }
}
