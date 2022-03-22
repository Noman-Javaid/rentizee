-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2022 at 10:19 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentizee`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `meta_title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_keyword` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_desc` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `catdesc` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `posts` int(30) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `meta_title`, `meta_keyword`, `meta_desc`, `slug`, `name`, `catdesc`, `status`, `posts`, `created_at`, `updated_at`) VALUES
(1, 'property', 'property prop pr real estate', 'property prop pr real estate', 'property', 'Properties', 'Posts of this types will show the rental real properties that can be of many types.(homes, shops)', 0, 7, '2021-12-08 07:04:11', '2022-03-06 08:47:14'),
(2, 'vehicles', 'veh vehicles travelling vehcls', 'veh vehicles travelling vehcls', 'vehicles', 'Vehicles', 'This category will show the rental posts related to vehicles (can include, cars, public transport, motorbikes etc)', 0, 9, '2021-12-09 03:02:11', '2022-03-06 09:12:37'),
(4, 'others', 'oth others', 'oth others', 'others', 'Others', 'The rental posts which are not related to anything mentioned in all categories', 0, 1, '2021-12-09 03:34:01', '2022-03-05 14:12:41'),
(18, 'electronics', 'ele electronics electric', 'ele electronics electric', 'electronics', 'Electronics', 'This category will show the rental listings related to electronics', 0, 7, '2021-12-10 11:44:56', '2022-03-05 15:03:09'),
(19, 'Services', 'services catering events management', 'services catering events management', 'services', 'Services', 'Services like catering or event management etc', 0, 1, '2021-12-10 12:28:17', '2022-03-05 14:08:58');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `province` int(30) NOT NULL,
  `prname` varchar(30) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `province`, `prname`, `created_at`, `updated_at`) VALUES
(14, 'Lahore', 11, 'Punjab', '2021-12-31 07:54:58', '2021-12-31 07:54:58'),
(15, 'Faisalabad', 11, 'Punjab', '2021-12-31 07:55:33', '2021-12-31 07:55:33'),
(16, 'Multan', 11, 'Punjab', '2021-12-31 07:55:59', '2021-12-31 07:55:59'),
(17, 'Bahawalnagar', 11, 'Punjab', '2021-12-31 07:56:21', '2021-12-31 07:56:21'),
(18, 'Karachi', 12, 'Sindh', '2021-12-31 07:57:15', '2021-12-31 07:57:15'),
(19, 'Haiderabad', 12, 'Sindh', '2021-12-31 07:57:39', '2021-12-31 07:57:39'),
(20, 'Quetta', 13, 'Balochistan', '2021-12-31 07:58:35', '2021-12-31 07:58:35'),
(21, 'Sialkot', 11, 'Punjab', '2021-12-31 07:58:58', '2021-12-31 07:58:58'),
(22, 'Peshawar', 14, 'KPK', '2021-12-31 07:59:32', '2021-12-31 07:59:32'),
(23, 'Murree', 11, 'Punjab', '2021-12-31 08:00:00', '2021-12-31 08:00:00'),
(25, 'Others', 17, 'Others', '2022-03-04 07:29:01', '2022-03-04 07:29:01'),
(26, 'ICT Islamabad', 18, 'ICT Islamabad', '2022-03-04 07:31:36', '2022-03-04 07:31:36');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2021_12_07_131248_create_categories_table', 2),
(6, '2021_12_10_110930_create_subcategories_table', 3),
(7, '2022_01_22_131349_create_rentals_table', 4),
(8, '2022_02_22_203456_create_subscriber_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 2, 'my-app-token', 'e22bc6d4da5e0f3f8fad2940af567e82b81f00cc7dbbe4db216d9592f92b535b', '[\"*\"]', NULL, '2021-11-11 04:11:56', '2021-11-11 04:11:56'),
(2, 'App\\Models\\User', 5, 'nj@gmail.com_Token', '33f623bcae52365e00035718b0a2767e3b8a1d0589ed3ed00dd8694dc3819eb4', '[\"*\"]', NULL, '2021-11-25 03:58:31', '2021-11-25 03:58:31'),
(4, 'App\\Models\\User', 3322, 'shahroz@gmail.com_Token', 'e52fb8222e7eed9fe612a432e9ed38c4d357ec7db83bb60d80001697e4890656', '[\"*\"]', NULL, '2021-11-27 03:15:19', '2021-11-27 03:15:19'),
(6, 'App\\Models\\User', 3324, 'shahroz2@gmail.com_Token', '4e4872126521fdede32f36ddc9ce2d48327a47029800ef7123daafcc2ca8ca25', '[\"*\"]', NULL, '2021-11-27 03:29:36', '2021-11-27 03:29:36'),
(12, 'App\\Models\\User', 3330, 'nomanjavaid@gmail.com_Token', '3d533a302f04cf3987915a826995d6bad1f8dd2760e3a88abf4fda4fedae37c9', '[\"*\"]', NULL, '2021-11-27 07:27:28', '2021-11-27 07:27:28'),
(97, 'App\\Models\\User', 3329, 'nomanjavaid1348@gmail.com_Token', '48c892baa81883f88c366514099361daf1424284f377941e36b684c0765c1fe4', '[\"*\"]', '2022-03-07 09:38:29', '2022-03-07 09:30:31', '2022-03-07 09:38:29');

-- --------------------------------------------------------

--
-- Table structure for table `province`
--

CREATE TABLE `province` (
  `id` int(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `province`
--

INSERT INTO `province` (`id`, `name`, `created_at`, `updated_at`) VALUES
(11, 'Punjab', '2021-12-31 07:53:15', '2021-12-31 07:53:15'),
(12, 'Sindh', '2021-12-31 07:53:34', '2021-12-31 07:53:34'),
(13, 'Balochistan', '2021-12-31 07:53:51', '2021-12-31 07:53:51'),
(14, 'KPK', '2021-12-31 07:54:06', '2021-12-31 07:54:06'),
(15, 'Gilgit Baltistan', '2021-12-31 07:54:36', '2021-12-31 07:54:36'),
(17, 'Others', '2022-03-04 07:28:29', '2022-03-04 07:28:29'),
(18, 'ICT Islamabad', '2022-03-04 07:30:39', '2022-03-04 07:30:39');

-- --------------------------------------------------------

--
-- Table structure for table `rentals`
--

CREATE TABLE `rentals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `auth_id` int(11) NOT NULL,
  `auth_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auth_role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auth_email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subcat` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone2` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `keywords` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `duration` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `condition` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `elevator` tinyint(4) NOT NULL DEFAULT 0,
  `lawn` tinyint(4) NOT NULL DEFAULT 0,
  `roof` tinyint(4) NOT NULL DEFAULT 0,
  `parking` tinyint(4) NOT NULL DEFAULT 0,
  `operator` tinyint(4) NOT NULL DEFAULT 0,
  `area` int(11) DEFAULT NULL,
  `floors` int(11) DEFAULT NULL,
  `bedrooms` int(11) DEFAULT NULL,
  `bathrooms` int(11) DEFAULT NULL,
  `kitchens` int(11) DEFAULT NULL,
  `car_model` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `milage` int(11) DEFAULT NULL,
  `fuel_average` int(11) DEFAULT NULL,
  `fuel_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `elec_model` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visits` int(30) NOT NULL DEFAULT 0,
  `phone_views` int(30) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rentals`
--

INSERT INTO `rentals` (`id`, `auth_id`, `auth_name`, `auth_role`, `auth_email`, `province`, `city`, `category`, `subcat`, `phone1`, `phone2`, `keywords`, `title`, `description`, `image`, `address`, `price`, `duration`, `condition`, `elevator`, `lawn`, `roof`, `parking`, `operator`, `area`, `floors`, `bedrooms`, `bathrooms`, `kitchens`, `car_model`, `milage`, `fuel_average`, `fuel_type`, `elec_model`, `company`, `visits`, `phone_views`, `created_at`, `updated_at`) VALUES
(4458, 3329, 'Noman Bhatti', 'admin', 'nomanjavaid1348@gmail.com', 'Punjab', 'Lahore', 'property', 'homes', '+923244345157', '+923244345157', '2 Kanal Beautiful Bungalow For Rent', '2 Kanal Beautiful Bungalow For Rent', '2 Kanal Beautiful Bungalow For Rent in DHA Lahore\r\n\r\nIdeal Location\r\nTop Deal \r\n5 Master Bedrooms \r\nAttach Jacuzzi Cabin Baths\r\nFully Furnished', 'uploads/rentals/1646480409.jpg', 'DHA Lahore', 300000, 'Per Month', 'Brand New', 0, 0, 0, 0, 0, 40, 2, 5, 6, 2, NULL, NULL, NULL, NULL, NULL, NULL, 4, 2, '2022-03-05 06:40:09', '2022-03-07 08:52:40'),
(4459, 3329, 'Noman Bhatti', 'admin', 'nomanjavaid1348@gmail.com', 'Punjab', 'Lahore', 'property', 'shops', '+923244345157', '+923244345157', '2 Marla CORNER Shop For Rent in Liberty Market', '2 Marla CORNER Shop For Rent in Liberty Market', '2 Marla CORNER Shop For Rent in Liberty Market Lahore\r\n\r\nPrime Location\r\nMain Liberty Market', 'uploads/rentals/1646481205.jpg', 'Liberty Market Lahore', 90000, 'Per Month', 'Used', 0, 0, 0, 1, 0, 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, 3, '2022-03-05 06:53:25', '2022-03-07 08:48:26'),
(4460, 3328, 'Shahroz Nasir', 'admin', 'shahroz@gmail.com', 'Punjab', 'Faisalabad', 'property', 'agriculture', '+923244252654', '+923244252654', '4 Kanal Agriculture Land For Rent', '4 Kanal Agriculture Land For Rent', '4 Kanal Agriculture Land For Rent near Sumandri Faisalabad \r\n\r\nBeautiful Land\r\nProper aggregation', 'uploads/rentals/1646481917.jpg', 'Sumandri', 800000, 'Per Year', 'Green Land', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, 2, '2022-03-05 07:05:17', '2022-03-05 15:30:49'),
(4461, 3328, 'Shahroz Nasir', 'admin', 'shahroz@gmail.com', 'Punjab', 'Multan', 'vehicles', 'cars', '+923244252654', '+923244252654', 'Beautiful Ferrari Car Available For Rent', 'Beautiful Ferrari Car Available For Rent', 'Beautiful Ferrari Car Available For Rent\r\n\r\nBrand New\r\nYellow\r\nScratch less', 'uploads/rentals/1646482569.jpg', 'Multan', 40000, 'Per Day', 'Brand New', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '2022', 1200, 6, 'Petrol', NULL, NULL, 5, 6, '2022-03-05 07:16:09', '2022-03-07 08:53:59'),
(4462, 3328, 'Shahroz Nasir', 'admin', 'shahroz@gmail.com', 'Punjab', 'Sialkot', 'electronics', 'sound', '+923244252654', '+923244252654', 'Sound System Available For Rent', 'Sound System Available For Rent', 'Sound System Available For Rent\r\n\r\nArrangement for 500 People\r\nLush Sound \r\nFull Base', 'uploads/rentals/1646483047.jpg', 'Sialkot', 5000, 'Per Day', 'Used', 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6, 4, '2022-03-05 07:24:07', '2022-03-05 15:25:27'),
(4463, 3336, 'San Diego', 'agency', 'sandiego@yahoo.com', 'Sindh', 'Karachi', 'property', 'homes', '+923338748736', '+923338748736', '2 Kanal Beautiful Bungalow Available for Rent', '2 Kanal Beautiful Bungalow Available for Rent', '2 Kanal Beautiful Bungalow Available for Rent\r\nin DHA Karachi\r\nPrime Location \r\nBrand New', 'uploads/rentals/1646483976.jpg', 'Karachi', 400000, 'Per Month', 'Brand New', 0, 1, 1, 1, 0, 40, 2, 5, 6, 2, NULL, NULL, NULL, NULL, NULL, NULL, 2, 4, '2022-03-05 07:39:36', '2022-03-05 15:59:36'),
(4464, 3336, 'San Diego', 'agency', 'sandiego@yahoo.com', 'Sindh', 'Haiderabad', 'property', 'agriculture', '+923338748736', '+923338748736', '5 Kanal Agriculture Land Available For Rent in Sindh', '5 Kanal Agriculture Land Available For Rent in Sindh', '5 Kanal Agriculture Land Available For Rent in Sindh\r\n\r\n\r\nGreen Land', 'uploads/rentals/1646484468.jpg', 'Haiderabad', 500000, 'Per Half Year', NULL, 0, 0, 0, 0, 0, 100, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 4, '2022-03-05 07:47:48', '2022-03-05 15:25:06'),
(4465, 3337, 'Team Rentals', 'agency', 'teamrentals@gmail.com', 'Balochistan', 'Quetta', 'vehicles', 'motorbike', '+923536476526', '+923536476526', 'Brand New Beautiful Sports Bike For Rent', 'Brand New Beautiful Sports Bike For Rent', 'Brand New Beautiful Bike For Rent\r\n\r\nAt Lowest Rate \r\nRent a Bike and Enjoy', 'uploads/rentals/1646504790.jpg', 'Quetta', 8000, 'Per Day', 'Brand New', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '2022', 6000, 25, 'Petrol', NULL, NULL, 7, 6, '2022-03-05 13:26:30', '2022-03-05 15:24:34'),
(4466, 3337, 'Team Rentals', 'agency', 'teamrentals@gmail.com', 'KPK', 'Peshawar', 'electronics', 'camera', '+923536476526', '+923536476526', 'New Canon Camera For Rent', 'New Canon Camera For Rent', 'New Canon Camera For Rent \r\n\r\nRent camera or Get a full Photoshoot Service \r\nContact for More Details', 'uploads/rentals/1646504992.jpg', 'Peshawar', 9000, 'Per Day', 'New', 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Canon', 'Canon', 6, 5, '2022-03-05 13:29:52', '2022-03-07 08:56:04'),
(4467, 3338, 'Bologna Rentals', 'agency', 'bologna@gmail.com', 'ICT Islamabad', 'ICT Islamabad', 'electronics', 'lights', '+923445222826', '+923445222826', 'Event Lights Available For Rent', 'Event Lights Available For Rent', 'Event Lights Available For Rent \r\n\r\nYou can rent Lights or get full Event Service too\r\ncontact us for more details', 'uploads/rentals/1646505391.jpg', 'Islamabad City', 5000, 'for 10 pcs per day', NULL, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 10, 3, '2022-03-05 13:36:31', '2022-03-05 15:24:38'),
(4468, 3338, 'Bologna Rentals', 'agency', 'bologna@gmail.com', 'Punjab', 'Lahore', 'vehicles', 'htv', '+923445222826', '+923445222826', '22 Wheeler Container Truck for Rent in Lahore', '22 Wheeler Container Truck for Rent in Lahore', '22 Wheeler Container Truck for Rent in Lahore\r\n\r\nContact for more details', 'uploads/rentals/1646505599.jpg', 'Lahore Cantt', 80000, 'Per Month', 'Used', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Toyota Truck', 100000, 4, 'Diesel', NULL, NULL, 2, 8, '2022-03-05 13:39:59', '2022-03-05 15:24:47'),
(4469, 3339, 'Home Jungle Estate', 'agency', 'homejungle@gmail.com', 'Punjab', 'Multan', 'property', 'shops', '+923455242536', '+923455242536', '1 Marla Main Blueward Shop For Rent', '1 Marla Main Blueward Shop For Rent', '1 Marla Main Blueward Shop For Rent\r\nContact For More Details', 'uploads/rentals/1646506622.jpg', 'Multan', 40000, 'Per Month', 'Used', 0, 0, 0, 1, 0, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, 9, '2022-03-05 13:57:02', '2022-03-05 16:01:30'),
(4470, 3339, 'Home Jungle Estate', 'agency', 'homejungle@gmail.com', 'Balochistan', 'Quetta', 'electronics', 'sound', '+923455242536', '+923455242536', 'Sound System Available For Rent', 'Sound System Available For Rent', 'Sound System Available For Rent\r\nContact For More Details', 'uploads/rentals/1646506814.jpg', 'Quetta', 8000, 'Per Day', 'New', 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Audionic A10', 'Audionic', 8, 9, '2022-03-05 14:00:14', '2022-03-07 08:59:43'),
(4471, 3340, 'Muscle Garage', 'agency', 'muscle@yahoo.com', 'Sindh', 'Karachi', 'services', 'event', '+923446635676', '+923446635676', 'Full Event Management Service available', 'Full Event Management Service available', 'Full Event Management Service available \r\nIncluding Sound\r\nlights\r\nRefreshment\r\nSitting etc', 'uploads/rentals/1646507338.jpg', 'Karachi', 500000, 'Per Function', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11, 12, '2022-03-05 14:08:58', '2022-03-07 08:59:52'),
(4472, 3340, 'Muscle Garage', 'agency', 'muscle@yahoo.com', 'Punjab', 'Bahawalnagar', 'others', 'others', '+923446635676', '+923446635676', 'Firecracker Service For any Function Available', 'Firecracker Service For any Function Available', 'Firecracker Service For any Function Available \r\n\r\nNew Year Nights\r\nCouple Entry Services\r\nCricket Match\r\nEtc', 'uploads/rentals/1646507561.jpg', 'Bahawalnagar', 80000, 'Per Function', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 13, 8, '2022-03-05 14:12:41', '2022-03-06 09:20:37'),
(4473, 3341, 'Ali Shan', 'admin', 'alishan@gmail.com', 'ICT Islamabad', 'ICT Islamabad', 'vehicles', 'htv', '+923474336616', '+923474336616', 'Army Truck Available for rent', 'Army Truck Available for rent', 'Army Truck Available for rent\r\n\r\nFor Travelling and other Hiking purposes \r\nDriver available', 'uploads/rentals/1646507963.jpg', 'Islamabad', 15000, 'Per Day', 'Used', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 120000, 7, 'Diesel', NULL, NULL, 4, 4, '2022-03-05 14:19:23', '2022-03-05 15:24:52'),
(4474, 3341, 'Ali Shan', 'admin', 'alishan@gmail.com', 'KPK', 'Peshawar', 'electronics', 'lights', '+923474336616', '+923474336616', 'Camera Shooting Lights available for rent', 'Camera Shooting Lights available for rent', 'Camera Shooting Lights available for rent \r\n\r\nFor Brand Shoots\r\nStage Lights\r\nDrama and Films \r\netc', 'uploads/rentals/1646508177.jpg', 'Peshawar', 8000, 'Per Pair for 1 Day', 'New', 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 7, '2022-03-05 14:22:57', '2022-03-05 15:25:00'),
(4475, 3343, 'Haneef Iqbal', 'end', 'haneef@gmail.com', 'Sindh', 'Haiderabad', 'vehicles', 'cars', '+923438761766', '+923438761766', 'All Type of Cars Available For Rent', 'All Type of Cars Available For Rent', 'All Type of Cars Available For Rent \r\nContact For More Details', 'uploads/rentals/1646508699.jpg', 'BHaiderabad', 8000, 'Per Day', 'Old and Brand New', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Mix Models', NULL, NULL, 'Petrol', NULL, NULL, 2, 7, '2022-03-05 14:31:40', '2022-03-05 15:25:31'),
(4476, 3344, 'Hassan Manzoor', 'end', 'hassan@gmail.com', 'Sindh', 'Karachi', 'electronics', 'camera', '+923228765654', '+923228765654', 'Nikon Camera Available For Rent and Shoots', 'Nikon Camera Available For Rent and Shoots', 'Camera Available For Rent and Shoots', 'uploads/rentals/1646510588.jpg', 'Karachi', 12000, 'Per Function', 'New', 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nikon N55', 'Nikon', 2, 2, '2022-03-05 15:03:08', '2022-03-05 15:25:33'),
(4477, 3344, 'Hassan Manzoor', 'end', 'hassan@gmail.com', 'Punjab', 'Sialkot', 'vehicles', 'motorbike', '+923228765654', '+923228765654', 'Yamaha Heavy Bike For Rent', 'Yamaha Heavy Bike For Rent', 'Yamaha Heavy Bike For Rent', 'uploads/rentals/1646510786.jpg', 'Sialkot', 25000, 'Per Day', 'Brand New', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Yamaha', 9000, 9, 'Petrol', NULL, NULL, 2, 3, '2022-03-05 15:06:26', '2022-03-05 15:25:37'),
(4478, 3346, 'Sayed Ali', 'end', 'sayedali@gmail.com', 'Punjab', 'Lahore', 'property', 'shops', '+923445635642', '+923445635642', '4 Marla Sector Shop For Rent in DHA Lahhore', '4 Marla Sector Shop For Rent in DHA Lahhore', '4 Marla Sector Shop For Rent in DHA Lahhore\r\nContact for More Details', 'uploads/rentals/1646574434.jpg', 'Lahore', 80000, 'Per Month', 'Used', 0, 0, 0, 1, 0, 4, 2, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, 3, 2, '2022-03-06 08:47:14', '2022-03-06 09:18:04'),
(4479, 3347, 'Waqas Ali', 'end', 'waqas@yahoo.com', 'Sindh', 'Haiderabad', 'vehicles', 'cars', '+923438765674', '+923438765674', 'Vigo Available For Rent', 'Vigo Available For Rent', 'Vigo Available For Rent \r\nContact for More details', 'uploads/rentals/1646575747.jpg', 'Haiderabad', 30000, 'Per Day', 'Brand New', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Vigo', 10000, 10, 'Petrol', NULL, NULL, 3, 4, '2022-03-06 09:09:07', '2022-03-06 09:18:00'),
(4480, 3347, 'Waqas Ali', 'end', 'waqas@yahoo.com', 'Punjab', 'Sialkot', 'vehicles', 'htv', '+923438765674', '+923438765674', '22 Wheler Truck Available For Monthly Rent', '22 Wheler Truck Available For Monthly Rent', '22 Wheler Truck Available For Monthly Rent\r\n\r\nContact for more details', 'uploads/rentals/1646575957.jpg', 'Sialkot', 100000, 'Per Month', 'Good', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 150000, 4, 'Diesel', NULL, NULL, 2, 2, '2022-03-06 09:12:37', '2022-03-06 09:17:54');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `meta_title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_keyword` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_desc` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parentcat` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `catdesc` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `posts` int(30) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `meta_title`, `meta_keyword`, `meta_desc`, `slug`, `parentcat`, `name`, `catdesc`, `status`, `posts`, `created_at`, `updated_at`) VALUES
(6, 'Homes', 'homes houses apartments flats residential residence portions', 'homes houses apartments flats residential residence portions', 'homes', 'property', 'Homes', 'Houses, Portions and other residential properties', 0, 2, '2021-12-10 11:48:12', '2022-03-05 07:39:36'),
(7, 'shops', 'shops commercial plaza market', 'shops commercial plaza market', 'shops', 'property', 'Shops', 'Shops plaza or other commercial properties', 0, 2, '2021-12-10 11:50:09', '2022-03-06 08:47:14'),
(8, 'Agriculture', 'agriculture land landlord farmers lands', 'agriculture land landlord farmers lands', 'agriculture', 'property', 'Agriculture', 'Agricultural Land for farmers or any other purposes', 0, 2, '2021-12-10 11:52:30', '2022-03-05 07:47:48'),
(10, 'cars', 'cars car motorcars motors', 'cars car motorcars motors', 'cars', 'vehicles', 'Cars', 'all type of cars will be in this type of category', 0, 3, '2021-12-10 12:13:30', '2022-03-06 09:09:07'),
(11, 'HTV', 'trucks buses coasters public transports', 'trucks buses coasters public transports', 'htv', 'vehicles', 'HTV', 'trucks buses coasters or public transports', 0, 4, '2021-12-10 12:16:32', '2022-03-06 09:12:37'),
(12, 'Motorbikes', 'bikes motor bike heavybike auto rikshaws', 'bikes motor bike heavybike auto rikshaws', 'motorbike', 'vehicles', 'Motorbikes', 'bikes of all types auto rikshaws', 0, 2, '2021-12-10 12:19:47', '2022-03-05 15:06:26'),
(13, 'Camera', 'camera movie photoshoot photography', 'camera movie photoshoot photography', 'camera', 'electronics', 'Camera', 'Cameras for movie or photography', 0, 3, '2021-12-10 12:21:54', '2022-03-05 15:03:09'),
(14, 'Sound System', 'sound system speaker', 'sound system speaker', 'sound', 'electronics', 'Sound System', 'Speakers sound system for any family or public function', 0, 2, '2021-12-10 12:23:56', '2022-03-05 14:00:14'),
(15, 'lights', 'lights focus stage catering', 'lights focus stage catering', 'lights', 'electronics', 'Lights', 'Stage Lights for any function', 0, 2, '2021-12-10 12:26:44', '2022-03-05 14:22:57'),
(16, 'Event Management', 'event management catering functions', 'event management catering functions', 'event', 'Services', 'Event Management', 'catering or any function or whole event management', 0, 1, '2021-12-10 12:30:32', '2022-03-05 14:08:58'),
(18, 'others', 'oth other others', 'oth other others', 'others', 'others', 'Others', 'All categories other than mentioned', 0, 1, '2022-01-01 05:44:17', '2022-03-05 14:12:41');

-- --------------------------------------------------------

--
-- Table structure for table `subscriber`
--

CREATE TABLE `subscriber` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user` int(11) NOT NULL,
  `subscriber` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `s_name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_role` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscriber`
--

INSERT INTO `subscriber` (`id`, `user`, `subscriber`, `created_at`, `updated_at`, `s_name`, `u_name`, `u_role`) VALUES
(46, 3328, 3328, '2022-03-05 07:26:41', '2022-03-05 07:26:41', 'Shahroz Nasir', 'Shahroz Nasir', 'admin'),
(47, 3329, 3328, '2022-03-05 07:26:57', '2022-03-05 07:26:57', 'Shahroz Nasir', 'Noman Bhatti', 'admin'),
(48, 3328, 3336, '2022-03-05 07:53:16', '2022-03-05 07:53:16', 'San Diego', 'Shahroz Nasir', 'admin'),
(49, 3329, 3336, '2022-03-05 07:53:49', '2022-03-05 07:53:49', 'San Diego', 'Noman Bhatti', 'admin'),
(50, 3329, 3337, '2022-03-05 13:17:56', '2022-03-05 13:17:56', 'Team Rentals', 'Noman Bhatti', 'admin'),
(51, 3328, 3337, '2022-03-05 13:18:42', '2022-03-05 13:18:42', 'Team Rentals', 'Shahroz Nasir', 'admin'),
(52, 3336, 3337, '2022-03-05 13:18:49', '2022-03-05 13:18:49', 'Team Rentals', 'San Diego', 'agency'),
(54, 3337, 3338, '2022-03-05 13:43:32', '2022-03-05 13:43:32', 'Bologna Rentals', 'Team Rentals', 'agency'),
(55, 3336, 3338, '2022-03-05 13:43:40', '2022-03-05 13:43:40', 'Bologna Rentals', 'San Diego', 'agency'),
(56, 3328, 3338, '2022-03-05 13:44:15', '2022-03-05 13:44:15', 'Bologna Rentals', 'Shahroz Nasir', 'admin'),
(57, 3329, 3338, '2022-03-05 13:44:20', '2022-03-05 13:44:20', 'Bologna Rentals', 'Noman Bhatti', 'admin'),
(58, 3329, 3339, '2022-03-05 14:02:34', '2022-03-05 14:02:34', 'Home Jungle Estate', 'Noman Bhatti', 'admin'),
(59, 3328, 3339, '2022-03-05 14:02:51', '2022-03-05 14:02:51', 'Home Jungle Estate', 'Shahroz Nasir', 'admin'),
(60, 3336, 3339, '2022-03-05 14:02:55', '2022-03-05 14:02:55', 'Home Jungle Estate', 'San Diego', 'agency'),
(61, 3338, 3339, '2022-03-05 14:02:56', '2022-03-05 14:02:56', 'Home Jungle Estate', 'Bologna Rentals', 'agency'),
(62, 3339, 3340, '2022-03-05 14:14:16', '2022-03-05 14:14:16', 'Muscle Garage', 'Home Jungle Estate', 'agency'),
(63, 3338, 3340, '2022-03-05 14:14:19', '2022-03-05 14:14:19', 'Muscle Garage', 'Bologna Rentals', 'agency'),
(64, 3337, 3340, '2022-03-05 14:15:00', '2022-03-05 14:15:00', 'Muscle Garage', 'Team Rentals', 'agency'),
(65, 3328, 3340, '2022-03-05 14:15:05', '2022-03-05 14:15:05', 'Muscle Garage', 'Shahroz Nasir', 'admin'),
(66, 3336, 3340, '2022-03-05 14:15:06', '2022-03-05 14:15:06', 'Muscle Garage', 'San Diego', 'agency'),
(67, 3329, 3340, '2022-03-05 14:15:08', '2022-03-05 14:15:08', 'Muscle Garage', 'Noman Bhatti', 'admin'),
(68, 3340, 3341, '2022-03-05 14:25:33', '2022-03-05 14:25:33', 'Ali Shan', 'Muscle Garage', 'agency'),
(69, 3338, 3341, '2022-03-05 14:26:24', '2022-03-05 14:26:24', 'Ali Shan', 'Bologna Rentals', 'agency'),
(70, 3339, 3341, '2022-03-05 14:26:41', '2022-03-05 14:26:41', 'Ali Shan', 'Home Jungle Estate', 'agency'),
(71, 3336, 3341, '2022-03-05 14:26:50', '2022-03-05 14:26:50', 'Ali Shan', 'San Diego', 'agency'),
(72, 3337, 3341, '2022-03-05 14:26:55', '2022-03-05 14:26:55', 'Ali Shan', 'Team Rentals', 'agency'),
(73, 3329, 3341, '2022-03-05 14:27:04', '2022-03-05 14:27:04', 'Ali Shan', 'Noman Bhatti', 'admin'),
(74, 3328, 3341, '2022-03-05 14:27:09', '2022-03-05 14:27:09', 'Ali Shan', 'Shahroz Nasir', 'admin'),
(75, 3341, 3343, '2022-03-05 14:33:42', '2022-03-05 14:33:42', 'Haneef Iqbal', 'Ali Shan', 'admin'),
(76, 3340, 3343, '2022-03-05 14:33:55', '2022-03-05 14:33:55', 'Haneef Iqbal', 'Muscle Garage', 'agency'),
(77, 3338, 3343, '2022-03-05 14:34:14', '2022-03-05 14:34:14', 'Haneef Iqbal', 'Bologna Rentals', 'agency'),
(78, 3339, 3343, '2022-03-05 14:34:41', '2022-03-05 14:34:41', 'Haneef Iqbal', 'Home Jungle Estate', 'agency'),
(79, 3336, 3343, '2022-03-05 14:34:42', '2022-03-05 14:34:42', 'Haneef Iqbal', 'San Diego', 'agency'),
(80, 3337, 3343, '2022-03-05 14:34:43', '2022-03-05 14:34:43', 'Haneef Iqbal', 'Team Rentals', 'agency'),
(81, 3328, 3343, '2022-03-05 14:34:51', '2022-03-05 14:34:51', 'Haneef Iqbal', 'Shahroz Nasir', 'admin'),
(82, 3329, 3343, '2022-03-05 14:34:59', '2022-03-05 14:34:59', 'Haneef Iqbal', 'Noman Bhatti', 'admin'),
(83, 3339, 3344, '2022-03-05 15:07:52', '2022-03-05 15:07:52', 'Hassan Manzoor', 'Home Jungle Estate', 'agency'),
(84, 3337, 3344, '2022-03-05 15:08:17', '2022-03-05 15:08:17', 'Hassan Manzoor', 'Team Rentals', 'agency'),
(85, 3338, 3344, '2022-03-05 15:08:29', '2022-03-05 15:08:29', 'Hassan Manzoor', 'Bologna Rentals', 'agency'),
(86, 3341, 3344, '2022-03-05 15:08:55', '2022-03-05 15:08:55', 'Hassan Manzoor', 'Ali Shan', 'admin'),
(87, 3336, 3344, '2022-03-05 15:09:00', '2022-03-05 15:09:00', 'Hassan Manzoor', 'San Diego', 'agency'),
(88, 3328, 3344, '2022-03-05 15:09:01', '2022-03-05 15:09:01', 'Hassan Manzoor', 'Shahroz Nasir', 'admin'),
(89, 3329, 3344, '2022-03-05 15:09:03', '2022-03-05 15:09:03', 'Hassan Manzoor', 'Noman Bhatti', 'admin'),
(90, 3339, 3346, '2022-03-06 08:51:31', '2022-03-06 08:51:31', 'Sayed Ali', 'Home Jungle Estate', 'agency'),
(91, 3340, 3346, '2022-03-06 08:52:10', '2022-03-06 08:52:10', 'Sayed Ali', 'Muscle Garage', 'agency'),
(92, 3337, 3346, '2022-03-06 08:52:26', '2022-03-06 08:52:26', 'Sayed Ali', 'Team Rentals', 'agency'),
(93, 3338, 3346, '2022-03-06 08:52:41', '2022-03-06 08:52:41', 'Sayed Ali', 'Bologna Rentals', 'agency'),
(94, 3336, 3346, '2022-03-06 08:52:55', '2022-03-06 08:52:55', 'Sayed Ali', 'San Diego', 'agency'),
(95, 3341, 3346, '2022-03-06 08:53:01', '2022-03-06 08:53:01', 'Sayed Ali', 'Ali Shan', 'admin'),
(96, 3329, 3346, '2022-03-06 08:53:06', '2022-03-06 08:53:06', 'Sayed Ali', 'Noman Bhatti', 'admin'),
(97, 3328, 3346, '2022-03-06 08:53:12', '2022-03-06 08:53:12', 'Sayed Ali', 'Shahroz Nasir', 'admin'),
(98, 3344, 3346, '2022-03-06 08:53:17', '2022-03-06 08:53:17', 'Sayed Ali', 'Hassan Manzoor', 'end'),
(99, 3340, 3347, '2022-03-06 09:14:04', '2022-03-06 09:14:04', 'Waqas Ali', 'Muscle Garage', 'agency'),
(100, 3339, 3347, '2022-03-06 09:14:26', '2022-03-06 09:14:26', 'Waqas Ali', 'Home Jungle Estate', 'agency'),
(101, 3338, 3347, '2022-03-06 09:15:10', '2022-03-06 09:15:10', 'Waqas Ali', 'Bologna Rentals', 'agency'),
(102, 3337, 3347, '2022-03-06 09:15:20', '2022-03-06 09:15:20', 'Waqas Ali', 'Team Rentals', 'agency'),
(103, 3336, 3347, '2022-03-06 09:15:33', '2022-03-06 09:15:33', 'Waqas Ali', 'San Diego', 'agency'),
(104, 3341, 3347, '2022-03-06 09:15:43', '2022-03-06 09:15:43', 'Waqas Ali', 'Ali Shan', 'admin'),
(105, 3328, 3347, '2022-03-06 09:15:47', '2022-03-06 09:15:47', 'Waqas Ali', 'Shahroz Nasir', 'admin'),
(106, 3329, 3347, '2022-03-06 09:15:49', '2022-03-06 09:15:49', 'Waqas Ali', 'Noman Bhatti', 'admin'),
(107, 3347, 3347, '2022-03-06 09:15:51', '2022-03-06 09:15:51', 'Waqas Ali', 'Waqas Ali', 'end'),
(108, 3343, 3347, '2022-03-06 09:15:53', '2022-03-06 09:15:53', 'Waqas Ali', 'Haneef Iqbal', 'end'),
(109, 3344, 3347, '2022-03-06 09:15:56', '2022-03-06 09:15:56', 'Waqas Ali', 'Hassan Manzoor', 'end'),
(110, 3346, 3347, '2022-03-06 09:15:58', '2022-03-06 09:15:58', 'Waqas Ali', 'Sayed Ali', 'end'),
(111, 3338, 3329, '2022-03-07 07:31:59', '2022-03-07 07:31:59', 'Noman Bhatti', 'Bologna Rentals', 'agency'),
(112, 3337, 3329, '2022-03-07 08:58:12', '2022-03-07 08:58:12', 'Noman Bhatti', 'Team Rentals', 'agency'),
(113, 3340, 3335, '2022-03-07 09:07:02', '2022-03-07 09:07:02', 'Hamza Jutt', 'Muscle Garage', 'agency');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` date NOT NULL,
  `role` text COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'end',
  `posts` int(191) NOT NULL DEFAULT 0,
  `quota` int(30) NOT NULL DEFAULT 3,
  `dp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `dob`, `role`, `posts`, `quota`, `dp`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(3328, 'Shahroz Nasir', 'shahroz@gmail.com', '+923244252654', '1999-12-26', 'admin', 3, 20, 'uploads/dp/1646393890.jpg', NULL, '$2y$10$TYKu9UEfT2fDB/k8FZ859OeCXWjmHIDTX/gpXVVZ.R0m1kdgZM5ZG', NULL, '2021-11-27 06:12:51', '2022-03-05 07:24:07'),
(3329, 'Noman Bhatti', 'nomanjavaid1348@gmail.com', '+923244345157', '1997-07-24', 'admin', 2, 10, 'uploads/dp/1645818962.jpeg', NULL, '$2y$10$IfXeGcIVpq6fcShd3bIGV.L0G.17vUO/KcvPHtAtbk9ezRJ7ghUJ6', NULL, '2021-11-27 06:59:52', '2022-03-05 06:53:25'),
(3335, 'Hamza Jutt', 'hamza@gmail.com', '+923084708056', '1997-12-31', 'admin', 0, 15, 'uploads/dp/1646390949.jpg', NULL, '$2y$10$pPWH.jrmm8IF4M5lNSo7fOgto8SJJPVgFWJbMXmAkoYMNI.AATlB.', NULL, '2022-03-04 05:49:09', '2022-03-05 16:03:36'),
(3336, 'San Diego', 'sandiego@yahoo.com', '+923338748736', '2002-12-05', 'agency', 2, 60, 'uploads/dp/1646391685.jpg', NULL, '$2y$10$gSuAj67gnKOdr17t473hDOel6KxiiC.4dbYTwbKYPm1dlDcF7Dv8u', NULL, '2022-03-04 06:01:25', '2022-03-05 07:47:48'),
(3337, 'Team Rentals', 'teamrentals@gmail.com', '+923536476526', '1922-03-04', 'agency', 2, 50, 'uploads/dp/1646391706.jpg', NULL, '$2y$10$rdKkV8zqBGBAiDtY4DCfH.QP.k11rJpa2VPAp6p2uDPaHoV0zHjem', NULL, '2022-03-04 06:01:46', '2022-03-05 13:29:52'),
(3338, 'Bologna Rentals', 'bologna@gmail.com', '+923445222826', '2018-09-09', 'agency', 2, 100, 'uploads/dp/1646393253.jpg', NULL, '$2y$10$rxnSIXOW8VqIKDT5ECYhBujYP/mJ2tA5mOgIcEj3HH0PW98VdRXgq', NULL, '2022-03-04 06:27:33', '2022-03-05 13:39:59'),
(3339, 'Home Jungle Estate', 'homejungle@gmail.com', '+923455242536', '2022-06-08', 'agency', 2, 150, 'uploads/dp/1646393359.jpg', NULL, '$2y$10$M2OqFnR.M8..cM9LIkY73./qC6/mxunFdcyF9TpGSlNjJYEEP3fNC', NULL, '2022-03-04 06:29:19', '2022-03-05 14:00:14'),
(3340, 'Muscle Garage', 'muscle@yahoo.com', '+923446635676', '1999-07-09', 'agency', 2, 100, 'uploads/dp/1646393762.jpg', NULL, '$2y$10$WZNpY0sxIWbt4Q3cO5zqqOM6TmsjSXV5gup.cWnzyczS7iKWe19bq', NULL, '2022-03-04 06:36:02', '2022-03-05 14:12:41'),
(3341, 'Ali Shan', 'alishan@gmail.com', '+923474336616', '1997-03-16', 'admin', 2, 20, 'uploads/dp/1646394119.jpg', NULL, '$2y$10$OBroh7H/Tes8j9aWnkJKJeZwdzKH1C4cNJIVAzoIPsT7kNsLUlRQe', NULL, '2022-03-04 06:41:59', '2022-03-05 14:22:57'),
(3343, 'Haneef Iqbal', 'haneef@gmail.com', '+923438761766', '2000-03-06', 'end', 1, 3, 'uploads/dp/1646394402.jpg', NULL, '$2y$10$hhJmxzEXlvXAZ6gvpDOixuM1EVlTtKEVoKSHPW9RBexq/j05Y8VCG', NULL, '2022-03-04 06:46:42', '2022-03-05 14:31:40'),
(3344, 'Hassan Manzoor', 'hassan@gmail.com', '+923228765654', '1999-03-07', 'end', 2, 3, 'uploads/dp/1646394477.jpg', NULL, '$2y$10$tDEFnzjnrHdF/JipNJH44OzKLWgqwgDKEarydOPX8r.v6FsfCRMZO', NULL, '2022-03-04 06:47:57', '2022-03-05 15:06:26'),
(3345, 'Maqsood Sindhu', 'maqsood@gmail.com', '+923338748736', '2000-02-22', 'end', 0, 3, 'uploads/dp/1646394680.jpg', NULL, '$2y$10$fp/T7pugsiBKpi/AgSN8OuZYbfA8jJIEtxIV94rLYf/yl0mPvjyjm', NULL, '2022-03-04 06:51:20', '2022-03-04 06:51:20'),
(3346, 'Sayed Ali', 'sayedali@gmail.com', '+923445635642', '1979-12-08', 'end', 1, 3, 'uploads/dp/1646394822.jpg', NULL, '$2y$10$c53gmJsnOZtYihHNHnzq5uRhpbVfEDovP3EuH5mQnC40FKnC6D8fS', NULL, '2022-03-04 06:53:42', '2022-03-06 08:47:14'),
(3347, 'Waqas Ali', 'waqas@yahoo.com', '+923438765674', '1990-06-06', 'end', 2, 3, 'uploads/dp/1646394949.jpg', NULL, '$2y$10$Tcr7s1mYYdmQshFr9QWECusrrhZBZJ98UNcH8zR8tp6ePiARtQiTK', NULL, '2022-03-04 06:55:49', '2022-03-06 09:12:37'),
(3348, 'Shahbaz Ali', 'shahbaz@gmail.com', '+923338765652', '2001-07-17', 'end', 0, 3, 'uploads/dp/1646395080.jpg', NULL, '$2y$10$gYl8P1RfSZv13d611kpTau0eKS4Tka6sxyPGIBTp5mwU92s0EuxeC', NULL, '2022-03-04 06:58:00', '2022-03-04 06:58:00'),
(3349, 'Hamid Subhani', 'hamid@hotmail.com', '+923445654876', '2005-06-06', 'end', 0, 3, 'uploads/dp/1646395200.jpg', NULL, '$2y$10$0.BY7V4RrlIz58LWIWfip.Zo3ZyVuSpwOxjfMt/lBkqWy3nNHhXO6', NULL, '2022-03-04 07:00:00', '2022-03-04 07:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `province`
--
ALTER TABLE `province`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rentals`
--
ALTER TABLE `rentals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscriber`
--
ALTER TABLE `subscriber`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `province`
--
ALTER TABLE `province`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `rentals`
--
ALTER TABLE `rentals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4481;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `subscriber`
--
ALTER TABLE `subscriber`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3350;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
