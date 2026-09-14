# Pipeline Specification: claims_processing

## 1. Pipeline Overview
- **Technology**: Python
- **Domain**: ETL Pipeline / Data Transformation
- **Business Area**: Claims
- **Owner**: EXL
- **Schedule**: Streaming / Hourly Batch
- **Average Runtime**: 01 mins 48 secs
- **Description**: Vectorized Python ETL pipeline for automated claims ingestion, schema validation, and delta lake publishing.

## 2. Ingested Data Sources
- **s3://insurance-raw/claims_stream/*.parquet** (Parquet Stream): `AWS S3`
- **postgres://core_db/policy_master** (PostgreSQL DB): `RDS PostgreSQL`
- **kafka://claims-events-topic** (Kafka Event Topic): `Confluent Cloud`
- **s3://insurance-ref/icd_codes.parquet** (Delta Reference): `AWS S3`

## 3. Published Targets
- **s3://insurance-lake/claims/curated_delta/** (Delta Lake): `AWS S3 Delta Table`
- **snowflake://analytics_db/claims_fact** (Snowflake Table): `Snowflake Warehouse`
- **kafka://claims-processed-events** (Kafka Topic): `Confluent Cloud`
- **redis://cache/claims_realtime_metrics** (Redis Cache): `ElastiCache`
- **elasticsearch://claims_search_index** (Elasticsearch Index): `OpenSearch`

## 4. Pipeline Stages & Tools
- **[Input] Polars / PyArrow Ingestion** (`py1`): High-throughput vectorized file reading
- **[Preparation] Pydantic Schema Validation** (`py2`): Strict type validation & anomaly flagging
- **[Transform] NumPy / Polars Join & Transforms** (`py3`): High performance deduplication and aggregation
- **[Output] Delta Lake & Snowflake Sink** (`py4`): ACID compliant atomic merge writes
