package run.halo.starter;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.server.HandlerFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.starter.model.Emoticon;

@Service
@RequiredArgsConstructor
public class EmoticonService {
    private final ReactiveExtensionClient client;
    
    Mono<Emoticon> getPerson(String key) {
        return client.fetch(Emoticon.class, key);
    }

    public Mono<Emoticon> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    public Mono<Emoticon> save(Emoticon emoticon) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    public Mono<Emoticon> findByKey(String key) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByKey'");
    }
}
