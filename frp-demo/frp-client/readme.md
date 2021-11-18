

## frpc.ini

```ini
[common]
server_addr = 119.45.235.239
server_port = 7000

#[ssh]
#type = tcp
#local_ip = 127.0.0.1
#local_port = 22
#remote_port = 6000

[web]
type = http
local_port = 8099
custom_domains = your.domain
```