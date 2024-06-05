package run.halo.starter;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.endpoint.CustomEndpoint;
import run.halo.starter.model.Emoticon;
import static org.springframework.web.reactive.function.server.RequestPredicates.contentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.HandlerFunction;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.function.server.ServerRequest;

@Component
@RequiredArgsConstructor
public class EmotionEndpoint implements CustomEndpoint {
    @Autowired
    private EmoticonService emoticonService;
    @Override
    public RouterFunction<ServerResponse> endpoint() {
        return RouterFunctions.route()
            .GET("/list", this::findAll)
            .POST("/save",contentType(MediaType.MULTIPART_FORM_DATA),
            this::save
            /**
             * 构造器定义api详细信息 */)
            .build();
    }
    
    private Mono<ServerResponse> findAll(ServerRequest request) {
        return emoticonService.findAll()
            .flatMap(emoticons -> ServerResponse.ok().bodyValue(emoticons))
            .switchIfEmpty(ServerResponse.noContent().build());
    }

    private Mono<ServerResponse> save(ServerRequest request) {
        return request.bodyToMono(Emoticon.class)
            .flatMap(emoticonService::save)
            .flatMap(emoticon -> ServerResponse.ok().bodyValue(emoticon))
            .onErrorResume(e -> ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR).bodyValue(e.getMessage()));
    }
}